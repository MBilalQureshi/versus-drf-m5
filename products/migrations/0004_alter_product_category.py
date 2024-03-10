# Generated by Django 4.2.5 on 2024-03-10 18:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0003_product_location_product_price'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='category',
            field=models.IntegerField(choices=[('Others', 'Others'), ('Electronics', 'Electronics'), ('Clothing', 'Clothing'), ('Books', 'Books'), ('Home & Kitchen', 'Home & Kitchen'), ('Sports & Outdoors', 'Sports & Outdoors'), ('Beauty & Personal Care', 'Beauty & Personal Care'), ('Health & Wellness', 'Health & Wellness'), ('Toys & Games', 'Toys & Games'), ('Automotive', 'Automotive'), ('Food & Grocery', 'Food & Grocery'), ('Furniture', 'Furniture'), ('Office & Stationery', 'Office & Stationery'), ('Pets', 'Pets'), ('Tools & Home Improvement', 'Tools & Home Improvement'), ('Travel & Luggage', 'Travel & Luggage'), ('Musical Instruments', 'Musical Instruments'), ('Baby & Kids', 'Baby & Kids'), ('Jewelry & Watches', 'Jewelry & Watches'), ('Art & Crafts', 'Art & Crafts'), ('Garden & Outdoor Living', 'Garden & Outdoor Living')], default=0),
        ),
    ]
