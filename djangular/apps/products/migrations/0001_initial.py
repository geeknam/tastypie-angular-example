# -*- coding: utf-8 -*-
import datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Adding model 'Product'
        db.create_table('products_product', (
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('code', self.gf('django.db.models.fields.CharField')(unique=True, max_length=300, db_index=True)),
            ('name', self.gf('django.db.models.fields.CharField')(unique=True, max_length=300, db_index=True)),
            ('weight', self.gf('django.db.models.fields.DecimalField')(default='0.0', null=True, max_digits=20, decimal_places=3, blank=True)),
            ('requires_serial_number', self.gf('django.db.models.fields.BooleanField')(default=True)),
        ))
        db.send_create_signal('products', ['Product'])


    def backwards(self, orm):
        # Deleting model 'Product'
        db.delete_table('products_product')


    models = {
        'products.product': {
            'Meta': {'ordering': "['code']", 'object_name': 'Product'},
            'code': ('django.db.models.fields.CharField', [], {'unique': 'True', 'max_length': '300', 'db_index': 'True'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'unique': 'True', 'max_length': '300', 'db_index': 'True'}),
            'requires_serial_number': ('django.db.models.fields.BooleanField', [], {'default': 'True'}),
            'weight': ('django.db.models.fields.DecimalField', [], {'default': "'0.0'", 'null': 'True', 'max_digits': '20', 'decimal_places': '3', 'blank': 'True'})
        }
    }

    complete_apps = ['products']