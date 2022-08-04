from django.db import models
from qwikidata.entity import WikidataItem
from qwikidata.linked_data_interface import get_entity_dict_from_api
from qwikidata.sparql  import return_sparql_query_results


class Enterprise(models.Model):
    code = models.CharField(max_length=500, verbose_name="Codigo empresa")
    name = models.CharField(max_length=3000,  verbose_name="nombre de la empresa",null=True,blank=True)
    country = models.CharField(max_length=500, verbose_name="Ciudad",null=True,blank=True)
    imagen = models.URLField(max_length = 2000,null=True,blank=True)
    logo = models.URLField(max_length = 2000,null=True,blank=True)
    detail = models.CharField(max_length=500, verbose_name="Detalle",null=True,blank=True)
    president = models.CharField(max_length=500, verbose_name="Presidente",null=True,blank=True)
    product = models.CharField(max_length=5000, verbose_name="Productos",null=True,blank=True)
    subsidiary = models.CharField(max_length=5000, verbose_name="Productos",null=True,blank=True)
    json_original = models.TextField(max_length=500000, verbose_name="JSON original",null=True,blank=True)

    class Meta:
        verbose_name="Empresa"
        verbose_name_plural="Empresas"

    def __str__(self):
        return f"{str(self.name)} {str(self.code)}"

    def save(self, *args, **kwargs):
        query = """
         SELECT ?WDid ?countryLabel ?logo ?managerLabel ?imagen ?productLabel ?subsidiaryLabel
         WHERE {
            ?WDid wdt:P279* wd:"""+self.code+""" .
                   OPTIONAL{?WDid wdt:P17 ?country}.
                   OPTIONAL{?WDid wdt:P154 ?logo}.
                   OPTIONAL{?WDid wdt:P1037 ?manager}.
                   OPTIONAL{?WDid wdt:P18 ?imagen}.
                   OPTIONAL{?WDid wdt:P1056 ?product}.
                   OPTIONAL{?WDid wdt:P355 ?subsidiary}.   
        SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
        }
        """
        # obntenemos el JSON
        res = return_sparql_query_results(query)
        data = res.get("results").get("bindings")
        product = list()
        subsidiary = list()
        for data in data:
            try:
                product.append(data.get("productLabel").get("value"))
            except Exception as e:
                print(e)
                pass
            try:
                subsidiary.append(data.get("subsidiaryLabel").get("value"))
            except Exception as e:
                print(e)
                pass

        self.product = list(dict.fromkeys(product))
        self.subsidiary = list(dict.fromkeys(subsidiary))
        # guardamos la información de la wikidata
        try:
            self.country = res.get("results").get("bindings")[0].get("country").get("value")
        except Exception as e:
            print(e)
            pass
        try:
            self.imagen = res.get("results").get("bindings")[0].get("imagen").get("value")
        except Exception as e:
            print(e)
            pass
        try:
            self.country = res.get("results").get("bindings")[0].get("countryLabel").get("value")
        except Exception as e:
            print(e)
            pass
        try:
            self.logo = res.get("results").get("bindings")[0].get("logo").get("value")
        except Exception as e:
            print(e)
            pass
        try:
            self.president = res.get("results").get("bindings")[0].get("managerLabel").get("value")
        except Exception as e:
            print(e)
            pass
        q42_dict = get_entity_dict_from_api(self.code)
        # guardamos el JSON
        self.json_original=q42_dict
        # guardamos el nombre de la wikidata
        self.name=q42_dict.get("labels").get("es").get("value")
        try:
            # guardamos el detalle de la wikidata
            self.detail=q42_dict.get("descriptions").get("es").get("value")
        except Exception as e:
            print(e)
        super(Enterprise, self).save(*args, **kwargs)
