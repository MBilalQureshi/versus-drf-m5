# Generated by Django 4.2.5 on 2024-03-10 20:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0004_alter_product_category'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='category',
            field=models.IntegerField(choices=[(0, 'Others'), (1, 'Electronics'), (2, 'Clothing'), (3, 'Books'), (4, 'Home & Kitchen'), (5, 'Sports & Outdoors'), (6, 'Beauty & Personal Care'), (7, 'Health & Wellness'), (8, 'Toys & Games'), (9, 'Automotive'), (10, 'Food & Grocery'), (11, 'Furniture'), (12, 'Office & Stationery'), (13, 'Pets'), (14, 'Tools & Home Improvement'), (15, 'Travel & Luggage'), (16, 'Musical Instruments'), (17, 'Baby & Kids'), (18, 'Jewelry & Watches'), (19, 'Art & Crafts'), (20, 'Garden & Outdoor Living')], default=0),
        ),
    ]