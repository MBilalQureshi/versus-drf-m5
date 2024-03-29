# Generated by Django 4.2.5 on 2024-03-09 14:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0002_product_category'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='location',
            field=models.CharField(default=250, max_length=80),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='product',
            name='price',
            field=models.DecimalField(decimal_places=2, default=300, max_digits=6),
            preserve_default=False,
        ),
    ]
