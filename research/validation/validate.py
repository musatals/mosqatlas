#!/usr/bin/env python3
"""Validate the pilot and cross-file scholarly integrity. Requires: pip install jsonschema."""
import json,sys
from pathlib import Path
try: from jsonschema import Draft202012Validator, FormatChecker
except ImportError:
 print('ERROR: install jsonschema to run structural validation: pip install jsonschema',file=sys.stderr);sys.exit(2)
ROOT=Path(__file__).resolve().parent.parent
read=lambda x: json.loads((ROOT/x).read_text(encoding='utf-8'))
schema=read('schema/mosque-record.v1.schema.json')
rows=read('data/pilot_verified_core_6.json'); sources=read('data/sources.json'); terms=read('data/terminology_en_fr_ar.json')
legacy=read('data/legacy_provisional_100.json'); index=read('data/catalog_index_102.json')
errs=[]
check=Draft202012Validator(schema,format_checker=FormatChecker())
srcids={s['id'] for s in sources}; ids=[r['id'] for r in rows]; allids={r['mosque_id'] for r in legacy}
if len(rows)!=6:errs.append(f'expected six pilots, got {len(rows)}')
if len(legacy)!=100 or len(allids)!=100:errs.append('legacy must have 100 unique IDs')
if len(ids)!=len(set(ids)):errs.append('pilot IDs duplicate')
if len(terms)!=len({t['term_id'] for t in terms}):errs.append('terminology term IDs duplicate')
if len(sources)!=len(srcids):errs.append('source IDs duplicate')
if set(index['legacy_ids'])!=allids or index['count']!=102:errs.append('catalog index mismatch')
if not {'MOS-0101','MOS-0102'}.issubset(set(ids)):errs.append('new records absent')
if {'MOS-0101','MOS-0102'} & allids:errs.append('new IDs collided with legacy')
for ix,r in enumerate(rows):
 for e in check.iter_errors(r): errs.append(f"{r['id']} schema {list(e.absolute_path)}: {e.message}")
 if r['provenance']['legacy_id']:
  if r['provenance']['legacy_id']!=r['id'] or r['id'] not in allids:errs.append(f"{r['id']} provenance mismatch")
 seen={}
 for typ,items in [('claims',r['claims']),('phases',r['chronology']['phases'])]:
  for item in items:
   if item['id'] in seen:errs.append(f"{r['id']} duplicate {typ} id {item['id']}")
   seen[item['id']]=1
 for path,arr in [('record',r['source_ids']),('foundation',r['chronology']['foundation']['source_ids']),('present',r['chronology']['present_structure']['source_ids']),('heritage',r['heritage']['source_ids'])]:
  for sid in arr:
   if sid not in srcids:errs.append(f"{r['id']} {path} dangling source {sid}")
 for lang in ('fr','ar'):
  combined=' '.join(r['content'][lang].values())
  arabic=sum('\u0600'<=c<='\u06FF' for c in combined)
  letters=sum(c.isalpha() for c in combined)
  proportion=arabic/max(1,letters)
  if lang=='ar' and proportion < 0.55:errs.append(f'{r["id"]} Arabic content appears to be in wrong language')
  if lang=='fr' and proportion > 0.2:errs.append(f'{r["id"]} French content appears to be in Arabic')
 for it in r['claims']+r['chronology']['phases']:
  for sid in it['source_ids']:
   if sid not in srcids:errs.append(f"{r['id']} dangling source in {it['id']}: {sid}")
 for dt_type in ['foundation','present_structure']:
  d=r['chronology'][dt_type]
  if d['sort_year'] is not None:
   if d['certainty']!='documented' or d['precision'] not in ['year','range'] or d['event_type']!='foundation': errs.append(f"{r['id']} invalid strict sort for {dt_type}")
   if d['sort_year']!=d['start_year']:errs.append(f"{r['id']} sort year mismatch")
  if d['start_year'] is not None and d['end_year'] is not None and d['end_year']<d['start_year']:errs.append(f"{r['id']} invalid date range")
 if r['editorial']['scholarly_peer_review']=='pending' and r['editorial']['approval']=='scholarly_approved':errs.append(f"{r['id']} falsely scholarly approved")
 if r['editorial']['image_license_status']=='no_reuse_cleared' and r['media']:errs.append(f"{r['id']} unlicensed media released")
 if r['model_3d'] is not None and r['editorial']['model_validation']=='not_applicable':errs.append(f"{r['id']} model erroneously validated")
 if r['heritage']['relationship']=='within_inscribed_property' and 'separately' not in (r['heritage']['context_note'] or '').lower() and r['id']=='MOS-0001':errs.append(f"{r['id']} UNESCO distinction omitted")
 if r['heritage']['relationship'] in ['within_inscribed_property','individually_inscribed','original_inscription_later_extended'] and not r['heritage']['unesco_property_id']:errs.append(f"{r['id']} UNESCO property ID missing")
for t in terms:
 if not all(t[k].strip() for k in ['en','fr','ar','definition_en']):errs.append(f"incomplete glossary term {t['term_id']}")
if errs:
 print('FAIL',len(errs),'errors')
 for e in errs:print(' -',e)
 sys.exit(1)
print(f'PASS — 6 source-verified core records, {sum(len(r["claims"]) for r in rows)} claims, {len(sources)} source entries, {len(terms)} EN/FR/AR terms, 100 legacy candidates and two noncolliding new IDs.')
print('NOTE — does not replace human historical peer review, translation proofreading, URL liveness checking, image licensing or model validation.')
