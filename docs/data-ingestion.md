---
id: data-ingestion
title: Data Ingestion
hide_title: true
sidebar_label: Data Ingestion
---

# Data Ingestion

## Overview

Flex Ingest leverages best-in-class ingestion engines like Meltano, dlt (Data Load Tool), SlingData, and more to deliver a highly configurable YAML-driven data ingestion experience. One configuration file can move data from any source to any destination. Flex Ingest also provides custom source and destination connectors for data ingestion and reverse ETL. We also provide custom adapters that leverage **high-performance native connectors** and data lake architecture that's up to 20x faster than standard adapters.

Prior to setting up a Data Ingestion task, you'll need to create a [Data Transformation and Orchestration job](etl.md).

---

## YAML Config Reference

### Minimal Config

```yaml
pipeline_name: my_pipeline
dataset: my_dataset
source: sql_database
destination: snowflake

tables:
  - users
  - orders
```

### Complete Config

```yaml
pipeline_name: my_pipeline
dataset: MY_DATASET
source: salesforce
destination: snowflake

# Memory management - process tables in batches
batch_size: 2  # Tables per batch (frees memory between batches)

# Default settings for all tables
defaults:
  primary_key: Id
  incremental_column: SystemModstamp

# Source-specific tuning
tuning:
  bulk_threshold: 1000000     # Auto-bulk for tables > 1M rows
  parallelize: false          # Sequential extraction (safer for memory)
  max_text_length: 4000       # VARCHAR max for formula fields
  text_length_multiplier: 4   # UTF-8 byte safety (4x multiplier)
  preserve_case: true         # Keep camelCase field names
  include_deleted: true       # Capture soft deletes

# dlt options (maps to DLT__* env vars)
options:
  extract:
    workers: 1
  normalize:
    workers: 2
    naming: sql_cs_v1         # Quoted identifiers for case preservation
  load:
    workers: 2

tables:
  - Account
  - Contact
  - name: et4ae5__IndividualEmailResult__c
    bulk: true  # Force Bulk API for this table
```

---

## Config Sections

### `batch_size`

Process tables in groups to prevent out-of-memory (OOM) errors on large pipelines.

```yaml
batch_size: 2  # Process 2 tables, load to destination, free memory, repeat
```

**When to use:**
- Container has limited memory (< 8GB)
- Loading many large tables
- Seeing OOM errors

**How it works:**
1. Pipeline runs with first N tables
2. Data loaded to destination
3. Memory freed
4. Next batch starts

### `defaults`

Settings applied to all tables (can be overridden per-table).

```yaml
defaults:
  primary_key: Id
  incremental_column: SystemModstamp
  write_disposition: merge
```

When `primary_key` or `incremental_column` is set, `write_disposition` automatically defaults to `merge`.

### `dataset`

Use `{SOURCE_SCHEMA}` in the dataset name to automatically route each source schema to its own destination schema:

```yaml
dataset: "raw_{SOURCE_SCHEMA}"  # Creates raw_HR, raw_FINANCE, etc.

tables:
  HR:
    - employees
    - departments
  FINANCE:
    - transactions
```

The pipeline runs one sub-pipeline per schema group, substituting the actual schema name into the dataset. Requires tables in [grouped format](#grouped-by-schema).

### `validate_rowcounts`

After loading, compare source row counts to destination row counts to catch silent data loss.

```yaml
validate_rowcounts: true         # Log a warning if counts differ
validate_rowcounts: 5.0          # Warn only if difference exceeds 5%
validate_rowcounts: "strict"     # Raise an exception on any mismatch
```

Can also be set per-table to target specific tables:

```yaml
tables:
  - users
  - name: critical_table
    validate_rowcounts: "strict"
```

### `tuning`

Source-specific extraction settings.

#### Oracle Tuning

| Key | Description | Default | When to Change |
|-----|-------------|---------|----------------|
| `parallelize` | Extract tables in parallel | `true` | Set `false` if hitting connection limits |
| `arraysize` | Rows per Oracle fetch batch | `100000` | Lower if OOM, higher if network is slow |
| `lob_arraysize` | Rows per fetch batch for tables with LOB columns (CLOB/BLOB) | `1000` | Increase carefully — LOB columns require extra round-trips per value |
| `encoding_errors` | How to handle unencodable characters in string columns | `"replace"` | `"ignore"` silently drops bad chars; `"strict"` raises an exception |

#### Salesforce Tuning

| Key | Description | Default | When to Change |
|-----|-------------|---------|----------------|
| `bulk` | API strategy: `false` (REST always), `true` (Bulk always), `"full_only"` (Bulk for full loads, REST for incrementals) | `false` | Use `"full_only"` for large tables with small daily changes |
| `bulk_threshold` | Auto-use Bulk API when total table rows > N. Counts all rows, not just the incremental subset. | `None` | Set to `1000000`; prefer `bulk: "full_only"` for incremental workloads |
| `bulk_yield_size` | Rows per yield batch during Bulk extraction | `100000` | Lower to `10000` for very wide tables (100+ fields) or low-memory servers |
| `chunk_days` | Split bulk queries by date range | `None` | Set to `30`–`365` for very large tables (10M+) |
| `parallelize` | Extract tables in parallel | `true` | Set `false` to reduce memory |
| `max_text_length` | VARCHAR max for formula fields | `None` | Set to `4000` for Informatica compatibility |
| `text_length_multiplier` | Multiply VARCHAR lengths | `1` | Set to `4` for UTF-8 byte safety |
| `preserve_case` | Keep original field names | `false` | Set `true` with `naming: sql_cs_v1` |
| `include_deleted` | Include soft-deleted records | `true` | Set `false` to exclude deleted rows |

### `options`

Maps directly to dlt configuration. Any nested key becomes `DLT__<SECTION>__<KEY>`.

```yaml
options:
  extract:
    workers: 1              # DLT__EXTRACT__WORKERS=1
    max_parallel_items: 5   # DLT__EXTRACT__MAX_PARALLEL_ITEMS=5
  normalize:
    workers: 2              # DLT__NORMALIZE__WORKERS=2
    naming: sql_cs_v1       # DLT__NORMALIZE__NAMING=sql_cs_v1
  load:
    workers: 2              # DLT__LOAD__WORKERS=2
    loader_file_format: jsonl
  data_writer:
    buffer_max_items: 5000  # In-memory rows before flushing to disk
    file_max_items: 100000  # Rows per intermediary file
    file_max_bytes: 10000000
  runtime:
    log_level: CRITICAL     # Silent — only pipeline-level output
```

**Key options reference:**

| Key | Default | Description |
|-----|---------|-------------|
| `extract.workers` | 5 | Threads for parallel extraction |
| `extract.max_parallel_items` | 20 | Max queued async items during extraction |
| `normalize.workers` | 1 | Processes for normalization (>1 uses multiprocessing) |
| `normalize.naming` | `snake_case` | Identifier naming convention |
| `load.workers` | 20 | Threads for parallel loading |
| `load.loader_file_format` | auto | File format for load jobs (`jsonl`, `parquet`) |
| `data_writer.buffer_max_items` | 5000 | In-memory rows before flush to disk |
| `runtime.log_level` | `WARNING` | dlt log verbosity |

**Log levels:**

| Level | Behavior |
|-------|----------|
| `DEBUG` | Full dlt internals — schema diffs, file writes, normalization details |
| `INFO` | Standard progress — extract counts, load status, step durations |
| `WARNING` | Warnings only — data issues, retries, non-fatal errors |
| `ERROR` | Errors only |
| `CRITICAL` | Silent — only pipeline-level output (table counts, batch timing) |

**Naming conventions (`normalize.naming`):**

| Convention | Case | Use When |
|-----------|------|----------|
| `snake_case` | Insensitive (lowercase) | Default — most destinations |
| `sql_ci_v1` | Insensitive (lowercase) | SQL-safe alternative to `snake_case` |
| `sql_cs_v1` | Sensitive (quoted) | Preserve Salesforce camelCase field names |
| `direct` | Sensitive | Pass-through with no transformation |

**Recommended workers by container memory:**

| Memory | extract.workers | normalize.workers | load.workers |
|--------|-----------------|-------------------|--------------|
| 4GB | 1 | 1 | 1 |
| 8GB | 1 | 2 | 2 |
| 16GB+ | 2 | 4 | 4 |

### `pipelines_dir`

Override the default dlt pipeline state directory (`~/.dlt/pipelines/`). Useful for container deployments or non-standard filesystem layouts.

```yaml
pipelines_dir: /data/dlt-state
```

Also configurable via environment variable (takes precedence over the config value):

```bash
export DLT_PIPELINES_DIR=/data/dlt-state
```

---

## Tables Configuration

### Flat List

```yaml
tables:
  - users
  - orders
  - products
```

### Grouped by Schema

For sources with tables in multiple schemas:

```yaml
tables:
  SCHEMA_A:
    - users
    - orders
  SCHEMA_B:
    - transactions
```

### Wildcards

Use `*` (matches any sequence) and `?` (matches a single character) in schema or table names:

```yaml
# Flat list — dot notation: SCHEMA.TABLE_PATTERN
tables:
  - "SATURN.*"          # All tables in SATURN
  - "HR.EMP*"           # Tables starting with EMP in HR
  - "*.audit_log"       # audit_log table in any schema

# Grouped format
tables:
  SATURN:
    - "STV*"            # All tables starting with STV
    - "*_log"           # All tables ending with _log
```

Expansion is logged at startup: `SATURN.STV* -> 12 table(s)`. Any per-table settings on a wildcard entry (`write_disposition`, `bulk`, `chunk_days`, etc.) are copied to every expanded table. Non-matching patterns are skipped with a warning.

### Per-Table Config

```yaml
tables:
  - Account                              # Simple replace
  - name: Contact
    primary_key: Id
    incremental_column: SystemModstamp   # Auto-merge
  - name: LargeTable__c
    bulk: true                           # Force Bulk API
    chunk_days: 30                       # Date chunking for 10M+ rows
```

### Column Hints

Override column types, precision, or constraints using dlt's native `columns` syntax:

```yaml
tables:
  - name: ps_assignment_type
    columns:
      descrshort:
        data_type: text
        precision: 200        # VARCHAR(200)
      amount:
        data_type: decimal
        precision: 10
        scale: 2              # DECIMAL(10,2)
      event_time:
        data_type: timestamp
        precision: 3          # Milliseconds
        timezone: false       # TIMESTAMP_NTZ
      is_active:
        nullable: false       # NOT NULL constraint
```

**Supported hints:**

| Hint | Description | Example |
|------|-------------|---------|
| `data_type` | Column type: `text`, `bigint`, `double`, `decimal`, `bool`, `date`, `timestamp` | `text` |
| `precision` | Length for text, total digits for decimal, fractional seconds for timestamp | `200` |
| `scale` | Decimal places (for `decimal` type) | `2` |
| `timezone` | Timezone awareness for timestamps | `false` |
| `nullable` | Allow NULL values | `false` |

### Write Dispositions

| Mode | Behavior | Use When |
|------|----------|----------|
| `replace` | Truncate and reload | Full refresh, small tables |
| `append` | Insert new rows | Event logs, immutable data |
| `merge` | Upsert by primary key | Incremental sync, mutable data |

**Auto-detection:** When `primary_key` or `incremental_column` is set, `write_disposition` defaults to `merge`.

---

## Native Oracle Extraction

### Features

- **Auto-detected** — Uses native path when `drivername` contains "oracle"
- **Per-table schema** — Grouped YAML format supports different schemas
- **Retry logic** — Retries on connection failures (not mid-stream to avoid duplicates)
- **Graceful skip** — Missing tables (ORA-00942) logged and skipped
- **Arrow-native** — Direct to columnar format, merge-compatible

### Configuration

```yaml
source: sql_database
source_credentials: connections.oracle_prod

tuning:
  arraysize: 100000    # Rows per fetch (tune for memory vs speed)
  parallelize: true    # Parallel table extraction

tables:
  HR:
    - employees
    - departments
  FINANCE:
    - transactions
```

---

## Native Salesforce Extraction

### Features

- **Any Salesforce object** — Standard and custom objects (e.g., `Academic_Advising__c`)
- **Bulk API 2.0** — 10–40x faster for large tables
- **Auto-bulk threshold** — Automatically switch API based on row count
- **Arrow-native** — Direct to columnar, merge-compatible
- **Date chunking** — Split huge tables into date ranges to reduce memory
- **Timing diagnostics** — See exactly where time is spent (API wait vs processing)

### API Selection Guide

| Table Size | Recommended | Config |
|------------|-------------|--------|
| < 100K rows | REST | (default) |
| 100K – 1M rows | Either | `bulk_threshold: 100000` |
| > 1M rows | Bulk API | `bulk: true` or `bulk_threshold: 1000000` |
| > 10M rows | Bulk + chunking | `bulk: true` + `chunk_days: 30` |

### Basic Usage

```yaml
pipeline_name: salesforce
dataset: SALESFORCE_DATA
source: salesforce
destination: snowflake

tables:
  - Account
  - Contact
  - Custom_Object__c    # Custom objects work!
```

### Incremental Sync (Recommended for Production)

```yaml
pipeline_name: salesforce
dataset: SALESFORCE_DATA
source: salesforce
destination: snowflake

defaults:
  primary_key: Id
  incremental_column: SystemModstamp

tuning:
  bulk_threshold: 1000000   # Auto-bulk for large tables
  include_deleted: true     # Track soft deletes

tables:
  - Account
  - Contact
  - Opportunity
  - name: et4ae5__IndividualEmailResult__c
    bulk: true              # Force bulk for known large table
```

**How incremental works:**

1. **First run**: Full extract of all records
2. **Subsequent runs**: Only fetches `WHERE SystemModstamp > last_loaded_value`
3. **Merge**: Upserts by `Id`, updating existing and inserting new records

**Key fields:**
- `primary_key: Id` — Salesforce record ID (always use this)
- `incremental_column: SystemModstamp` — Updated on any change (preferred over LastModifiedDate)
- `include_deleted: true` — Captures soft deletes so the `IsDeleted` flag is synced

### Bulk API with Date Chunking

For very large tables (10M+ rows), split into date ranges to reduce memory:

```yaml
tuning:
  bulk: true
  chunk_days: 30    # Query 30 days at a time

tables:
  - name: ActivityHistory__c
    chunk_field: CreatedDate    # Optional: override chunk field
```

### Timing Diagnostics

The Bulk API path logs detailed timing:

```
Contact: 117 chunks, wait_sf=1341.6s, parse=39.9s, yield=62.2s
```

- `wait_sf` — Time waiting for Salesforce to deliver data (network/API bottleneck)
- `parse` — Time parsing CSV to Arrow
- `yield` — Time for dlt to process batches

If `wait_sf` dominates, the bottleneck is Salesforce. If `yield` dominates, increase `batch_size` or reduce `normalize.workers`.

### Case-Preserving DDL (Informatica Compatibility)

```yaml
tuning:
  max_text_length: 4000
  text_length_multiplier: 4
  preserve_case: true

options:
  normalize:
    naming: sql_cs_v1
```

Produces:
```sql
CREATE TABLE "Account" (
    "Id" VARCHAR(72),
    "Name" VARCHAR(1020),
    "_dlt_load_id" VARCHAR,
    "_dlt_id" VARCHAR
);
```

---

## Memory Management

### Symptoms of Memory Issues

- Container killed (OOMKilled)
- "Cannot allocate memory" errors
- Pipeline hangs during normalize phase

### Solutions

**1. Reduce batch size:**
```yaml
batch_size: 1  # Process one table at a time
```

**2. Reduce workers:**
```yaml
options:
  extract:
    workers: 1
  normalize:
    workers: 1
  load:
    workers: 1
```

**3. Disable parallelization:**
```yaml
tuning:
  parallelize: false
```

**4. Use date chunking for huge tables:**
```yaml
tuning:
  chunk_days: 30  # Frees memory between chunks
```

**5. Lower Oracle fetch size:**
```yaml
tuning:
  arraysize: 10000  # Down from default 100000
```

### Memory Budget Guide

| Container Memory | Recommended Config |
|------------------|-------------------|
| 4GB | `batch_size: 1`, all workers: 1, `parallelize: false` |
| 8GB | `batch_size: 2`, workers: 2, `parallelize: false` |
| 16GB | `batch_size: 4`, workers: 4, `parallelize: true` |

---

## Troubleshooting

### "No data loaded" / Empty tables

- Check source credentials and permissions
- Verify table/object names (case-sensitive for custom objects)
- Check for `IsDeleted = true` filter if `include_deleted: false`

### Slow Salesforce extraction

- Check timing logs: if `wait_sf` is high, Salesforce API is the bottleneck
- Reduce number of fields if possible
- Use Bulk API for tables > 100K rows
- Use date chunking for tables > 10M rows

### Merge not working / No `_dlt_id` column

- Ensure `primary_key` and `incremental_column` are set
- The pipeline auto-enables `add_dlt_id` for Arrow tables
- Check that `write_disposition` resolved to `merge` (logged at startup)

### OOM / Memory errors

See [Memory Management](#memory-management) section.

### Oracle connection timeouts

The pipeline sets reasonable defaults (`tcp_connect_timeout`: 30s, `call_timeout`: 600000ms). Override in tuning if needed:

```yaml
tuning:
  tcp_connect_timeout: 60
  call_timeout: 1200000
```

---

## Best Practices

### For First-Time Users

1. **Start small** — Test with one small table first
2. **Use incremental** — Set `primary_key` and `incremental_column` for production
3. **Monitor memory** — Start with conservative settings, increase gradually
4. **Check timing logs** — Understand where time is spent before optimizing

### For Production

1. **Always use incremental** for mutable data (not append-only logs)
2. **Set `include_deleted: true`** for accurate state sync
3. **Use `bulk_threshold`** instead of `bulk: true` for mixed table sizes
4. **Set `batch_size`** based on container memory
5. **Use named connections** for environment separation

### Performance Optimization

1. **Salesforce**: Use Bulk API for anything > 100K rows
2. **Oracle**: Increase `arraysize` if memory allows
3. **General**: Increase workers if CPU is underutilized
4. **Snowflake**: Use a larger warehouse for faster COPY (scale up during load)
