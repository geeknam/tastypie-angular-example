from django.db import models

# Create your models here.


class Product(models.Model):
    '''
    Base product object used internally by purchaser
    '''
    code = models.CharField(
        'Product Code',
        max_length=300,
        unique=True,
        db_index=True,
        help_text='Should match the website SKU and should contain only alpha-numeric characters.'
    )
    name = models.CharField(
        'Product Name',
        max_length=300,
        unique=True,
        db_index=True,
        help_text='Free-form text to provide a long description of the product.'
    )
    weight = models.DecimalField(
        'Shipping Weight',
        max_digits=20,
        decimal_places=3,
        null=True,
        blank=True,
        default='0.0',
        help_text='Nominal product shipping weight (in kg). This can be overridden by suppliers.'
    )
    requires_serial_number = models.BooleanField(
        'Serial number required with shipment',
        default=True,
        help_text='This should be true for any non-accessory products.'
    )

    def __unicode__(self):
        return self.code + ' - ' + self.name

    class Meta:
        ordering = ['code']
