from django.contrib import admin
from django.conf.urls.defaults import patterns, include, url
from django.views.generic import TemplateView


# See: https://docs.djangoproject.com/en/dev/ref/contrib/admin/#hooking-adminsite-instances-into-your-urlconf
admin.autodiscover()

from apps.products.api import ProductResource
product_resource = ProductResource()


# See: https://docs.djangoproject.com/en/dev/topics/http/urls/
urlpatterns = patterns('',
    # Admin panel and documentation:

    url(r'^$', TemplateView.as_view(template_name='home.html')),
    url(r'^admin/doc/', include('django.contrib.admindocs.urls')),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^api/', include(product_resource.urls)),
)
