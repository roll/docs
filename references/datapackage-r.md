<img src="okgr.png" align="right" width=130px /><img src="oklabs.png" align="right" width=130px /><br><br/><img src="frictionlessdata.png" align="left" width=60 />rictionless Data - <br/> Data Package
================

[![Build Status](https://travis-ci.org/okgreece/datapackage-r.svg?branch=master)](https://travis-ci.org/okgreece/datapackage-r) [![Coverage Status](https://coveralls.io/repos/github/okgreece/datapackage-r/badge.svg?branch=master)](https://coveralls.io/github/okgreece/datapackage-r?branch=master) <!-- [![Coverage Status](https://img.shields.io/codecov/c/github/okgreece/datapackage-r/master.svg)](https://codecov.io/github/okgreece/datapackage-r?branch=master) --> [![Github Issues](http://githubbadges.herokuapp.com/okgreece/datapackage-r/issues.svg)](https://github.com/okgreece/datapackage-r/issues) [![Pending Pull-Requests](http://githubbadges.herokuapp.com/okgreece/datapackage-r/pulls.svg)](https://github.com/okgreece/datapackage-r/pulls) [![Project Status: Active – The project has reached a stable, usable state but is no longer being actively developed; support/maintenance will be provided as time allows.](http://www.repostatus.org/badges/latest/active.svg)](http://www.repostatus.org/#active) [![packageversion](https://img.shields.io/badge/Package%20version-0.1.0-orange.svg?style=flat-square)](commits/master) [![minimal R version](https://img.shields.io/badge/R%3E%3D-3.1-6666ff.svg)](https://cran.r-project.org/) [![Licence](https://img.shields.io/badge/licence-MIT-blue.svg)](https://opensource.org/licenses/MIT) [![Gitter](https://img.shields.io/gitter/room/nwjs/nw.js.svg)](https://gitter.im/frictionlessdata/chat)

Description
===========

R library for working with [Data Package](http://frictionlessdata.io/specs/data-package).

Features
--------

-   `Package` class for working with data packages
-   `Resource` class for working with data resources
-   `Profile` class for working with profiles
-   `validate` function for validating data package descriptors
-   `infer` function for inferring data package descriptors

Getting started
===============

Installation
------------

In order to install the latest distribution of [R software](https://www.r-project.org/) to your computer you have to select one of the mirror sites of the [Comprehensive R Archive Network](https://cloud.r-project.org/), select the appropriate link for your operating system and follow the wizard instructions.

For windows users you can:

1.  Go to CRAN
2.  Click download R for Windows
3.  Click Base (This is what you want to install R for the first time)
4.  Download the latest R version
5.  Run installation file and follow the instrustions of the installer.

(Mac) OS X and Linux users may need to follow different steps depending on their system version to install R successfully and it is recommended to read the instructions on CRAN site carefully.

Even more detailed installation instructions can be found in [R Installation and Administration manual](https://cran.r-project.org/doc/manuals/R-admin.html).

To install [RStudio](https://www.rstudio.com/), you can download [RStudio Desktop](https://www.rstudio.com/products/rstudio/download/) with Open Source License and follow the wizard instructions:

1.  Go to [RStudio](https://www.rstudio.com/products/rstudio/)
2.  Click download on RStudio Desktop
3.  Download on RStudio Desktop free download
4.  Select the appropriate file for your system
5.  Run installation file

To install the `datapackage` library it is necessary to install first `devtools` library to make installation of github libraries available.

``` r
# Install devtools package if not already
install.packages("devtools")
```

Install `datapackage.r`

``` r
# And then install the development version from github
devtools::install_github("okgreece/datapackage.r")
```

Load library
------------

``` r
# load the library using
library(datapackage.r)
```

Examples
========

Code examples in this readme requires R 3.3 or higher, You could see even more [examples](https://github.com/okgreece/datapackage-r/tree/master/inst/examples) in examples directory (and vignettes will be soon available).

``` r
descriptor = '{
  "resources": [
    {
      "name": "example",
      "profile": "tabular-data-resource",
      "data": [
        ["height", "age", "name"],
        [180, 18, "Tony"],
        [192, 32, "Jacob"]
      ],
      "schema":  {
        "fields": [
          {"name": "height", "type": "integer" },
          {"name": "age", "type": "integer" },
          {"name": "name", "type": "string" }
        ]
      }
    }
  ]
}'

dataPackage = Package.load(descriptor)
dataPackage
```

    ## <Package>
    ##   Public:
    ##     clone: function (deep = FALSE) 
    ##     commit: function (strict = NULL) 
    ##     descriptor: active binding
    ##     errors: active binding
    ##     infer: function (pattern) 
    ##     initialize: function (descriptor = list(), basePath = NULL, pattern = NULL, 
    ##     profile: active binding
    ##     resourceNames: active binding
    ##     resources: active binding
    ##     save: function (target, type = "json") 
    ##     valid: active binding
    ##   Private:
    ##     basePath_: NULL
    ##     build_: function () 
    ##     currentDescriptor_: list
    ##     currentDescriptor_json: NULL
    ##     descriptor_: NULL
    ##     errors_: list
    ##     nextDescriptor_: list
    ##     pattern_: NULL
    ##     profile_: profile, R6
    ##     resources_: list
    ##     resources_length: 0
    ##     strict_: FALSE

``` r
#resource = dataPackage$getResource('example')
#resource$read() # [[180, 18, 'Tony'], [192, 32, 'Jacob']]
```

Documentation
=============

The package is still under development and some properties may not be working properly.

Json objects are not included in R base data types. [Jsonlite package](https://CRAN.R-project.org/package=jsonlite) is internally used to convert json data to list objects. The input parameters of functions could be json strings, files or lists and the outputs are in list format to easily further process your data in R environment and exported as desired. The examples below show how to use jsonlite package to convert the output back to json adding indentation whitespace. More details about handling json you can see jsonlite documentation or vignettes [here](https://CRAN.R-project.org/package=jsonlite).

Package
-------

A class for working with data packages. It provides various capabilities like loading local or remote data package, inferring a data package descriptor, saving a data package descriptor and many more.

Consider we have some local `csv` files in a `data` directory. Let's create a data package based on this data using a `Package` class:

> inst/data/cities.csv

``` csv
city,location
london,"51.50,-0.11"
paris,"48.85,2.30"
rome,"41.89,12.51"
```

> inst/data/population.csv

``` csv
city,year,population
london,2017,8780000
paris,2017,2240000
rome,2017,2860000
```

First we create a blank data package::

``` r
dataPackage = Package.load()
```

Now we're ready to infer a data package descriptor based on data files we have. Because we have two csv files we use glob pattern `*.csv`:

``` r
dataPackage$infer('**.csv')
dataPackage$descriptor
```

An `infer` method has found all our files and inspected it to extract useful metadata like profile, encoding, format, Table Schema etc. Let's tweak it a little bit:

``` r
#dataPackage$descriptor$resources[1]$schema$fields[1]$type = 'year'
dataPackage$commit()
dataPackage$valid # true
```

Because our resources are tabular we could read it as a tabular data:

``` r
dataPackage$getResource('population')$read( keyed = TRUE ) 

# [ { city: 'london', year: 2017, population: 8780000 },
#   { city: 'paris', year: 2017, population: 2240000 },
#   { city: 'rome', year: 2017, population: 2860000 } ]
```

Let's save our descriptor on the disk. After it we could update our `datapackage.json` as we want, make some changes etc:

``` r
dataPackage.save('datapackage.json')
```

To continue the work with the data package we just load it again but this time using local `datapackage.json`:

``` r
dataPackage = Package.load('datapackage.json')
# Continue the work
```

It was onle basic introduction to the `Package` class. To learn more let's take a look on `Package` class API reference.

#### `Package.load(descriptor, basePath, strict=FALSE)`

Constructor to instantiate `Package` class.

-   `descriptor (String/Object)` - data package descriptor as local path, url or object
-   `basePath (String)` - base path for all relative paths
-   `strict (Boolean)` - strict flag to alter validation behavior. Setting it to `TRUE` leads to throwing errors on any operation with invalid descriptor
-   `(errors.DataPackageError)` - raises error if something goes wrong
-   `(Package)` - returns data package class instance

#### `package$valid`

-   `(Boolean)` - returns validation status. It always true in strict mode.

#### `package$errors`

-   `(Error[])` - returns validation errors. It always empty in strict mode.

#### `package$profile`

-   `(Profile)` - returns an instance of `Profile` class (see below).

#### `package$descriptor`

-   `(Object)` - returns data package descriptor

#### `package$resources`

-   `(Resource[])` - returns an list of `Resource` instances (see below).

#### `package$resourceNames`

-   `(String[])` - returns an list of resource names.

#### `package$getResource(name)`

Get data package resource by name.

-   `name (String)` - data resource name
-   `(Resource/null)` - returns `Resource` instances or null if not found

#### `package$addResource(descriptor)`

Add new resource to data package. The data package descriptor will be validated with newly added resource descriptor.

-   `descriptor (Object)` - data resource descriptor
-   `(errors$DataPackageError)` - raises error if something goes wrong
-   `(Resource/null)` - returns added `Resource` instance or null if not added

#### `package$removeResource(name)`

Remove data package resource by name. The data package descriptor will be validated after resource descriptor removal.

-   `name (String)` - data resource name
-   `(errors$DataPackageError)` - raises error if something goes wrong
-   `(Resource/null)` - returns removed `Resource` instances or null if not found

#### `package$infer(pattern=FALSE)`

Infer a data package metadata. If `pattern` is not provided only existent resources will be inferred (added metadata like encoding, profile etc). If `pattern` is provided new resoures with file names mathing the pattern will be added and inferred. It commits changes to data package instance.

-   `pattern (String)` - glob pattern for new resources
-   `(Object)` - returns data package descriptor

#### `package$commit(strict)`

Update data package instance if there are in-place changes in the descriptor.

-   `strict (Boolean)` - alter `strict` mode for further work
-   `(errors$DataPackageError)` - raises error if something goes wrong
-   `(Boolean)` - returns true on success and false if not modified

``` r
dataPackage = Package.load('{
    "name": "package",
    "resources": [{"name": "resource", "data": ["data"]}]
}')

dataPackage$descriptor$name # package
```

    ## [1] "package"

``` r
dataPackage$descriptor$name = 'renamed-package'
dataPackage$commit()
```

    ## [1] TRUE

``` r
dataPackage$descriptor$name # renamed-package
```

    ## [1] "renamed-package"

#### `package.save(target)`

> For now only descriptor will be saved.

Save data package to target destination.

-   `target (String)` - path where to save a data package
-   `(errors$DataPackageError)` - raises error if something goes wrong
-   `(Boolean)` - returns true on success

### Resource

A class for working with data resources. You can read or iterate tabular resources using the `iter/read` methods and all resource as bytes using `rowIter/rowRead` methods.

Consider we have some local csv file. It could be inline data or remote link - all supported by `Resource` class (except local files for in-brower usage of course). But say it's `data.csv` for now:

``` csv
city,location
london,"51.50,-0.11"
paris,"48.85,2.30"
rome,N/A
```

Let's create and read a resource. We use static `Resource$load` method instantiate a resource. Because resource is tabular we could use `resourceread` method with a `keyed` option to get an array of keyed rows:

``` r
resource = Resource.load('{"path": "data.csv"}')
resource$tabular# TRUE
```

    ## [1] TRUE

``` r
#resource$headers # ['city', 'location']
#resource$read(keyed = TRUE)

# [
#   {city: 'london', location: '51.50,-0.11'},
#   {city: 'paris', location: '48.85,2.30'},
#   {city: 'rome', location: 'N/A'},
# ]
```

As we could see our locations are just a strings. But it should be geopoints. Also Rome's location is not available but it's also just a `N/A` string instead of JavaScript `null`. First we have to infer resource metadata:

``` r
resource$infer()
resource$descriptor
#{ path: 'data.csv',
#  profile: 'tabular-data-resource',
#  encoding: 'utf-8',
#  name: 'data',
#  format: 'csv',
#  mediatype: 'text/csv',
# schema: { fields: [ [Object], [Object] ], missingValues: [ '' ] } }
resource$read( keyed = TRUE )
# Fails with a data validation error
```

Let's fix not available location. There is a `missingValues` property in Table Schema specification. As a first try we set `missingValues` to `N/A` in `resource$descriptor.schema`. Resource descriptor could be changed in-place but all changes should be commited by `resource$commit()`:

``` r
resource$descriptor$schema$missingValues = 'N/A'
resource$commit()
resource$valid # FALSE
resource$errors
# Error: Descriptor validation error:
#   Invalid type: string (expected array)
#    at "/missingValues" in descriptor and
#    at "/properties/missingValues/type" in profile
```

As a good citiziens we've decided to check out recource descriptor validity. And it's not valid! We should use an array for `missingValues` property. Also don't forget to have an empty string as a missing value:

``` r
resource$descriptor$schema[['missingValues']] = list('', 'N/A')
resource$commit()
resource$valid # TRUE
```

All good. It looks like we're ready to read our data again:

``` r
resource$read( keyed = TRUE )
# [
#   {city: 'london', location: [51.50,-0.11]},
#   {city: 'paris', location: [48.85,2.30]},
#   {city: 'rome', location: null},
# ]
```

Now we see that: - locations are arrays with numeric lattide and longitude - Rome's location is a native JavaScript `null`

And because there are no errors on data reading we could be sure that our data is valid againt our schema. Let's save our resource descriptor:

``` r
resource$save('dataresource.json')
```

Let's check newly-crated `dataresource.json`. It contains path to our data file, inferred metadata and our `missingValues` tweak:

``` json
{
    "path": "data.csv",
    "profile": "tabular-data-resource",
    "encoding": "utf-8",
    "name": "data",
    "format": "csv",
    "mediatype": "text/csv",
    "schema": {
        "fields": [
            {
                "name": "city",
                "type": "string",
                "format": "default"
            },
            {
                "name": "location",
                "type": "geopoint",
                "format": "default"
            }
        ],
        "missingValues": [
            "",
            "N/A"
        ]
    }
}
```

If we decide to improve it even more we could update the `dataresource.json` file and then open it again using local file name:

``` r
resource = Resource.load('dataresource.json')
# Continue the work
```

It was onle basic introduction to the `Resource` class. To learn more let's take a look on `Resource` class API reference.

#### `Resource$load(descriptor, basePath, strict=FALSE)`

Constructor to instantiate `Resource` class.

-   `descriptor (String/Object)` - data resource descriptor as local path, url or object
-   `basePath (String)` - base path for all relative paths
-   `strict (Boolean)` - strict flag to alter validation behavior. Setting it to `TRUE` leads to throwing errors on any operation with invalid descriptor
-   `(errors.DataPackageError)` - raises error if something goes wrong
-   `(Resource)` - returns resource class instance

#### `resource$valid`

-   `(Boolean)` - returns validation status. It always true in strict mode.

#### `resource$errors`

-   `(Error[])` - returns validation errors. It always empty in strict mode.

#### `resource$profile`

-   `(Profile)` - returns an instance of `Profile` class (see below).

#### `resource$descriptor`

-   (Object) - returns resource descriptor

#### `resource$name`

-   `(String)` - returns resource name

#### `resource$inline`

-   `(Boolean)` - returns true if resource is inline

#### `resource$local`

-   `(Boolean)` - returns true if resource is local

#### `resource$remote`

-   `(Boolean)` - returns true if resource is remote

#### `resource$multipart`

-   `(Boolean)` - returns true if resource is multipart

#### `resource$tabular`

-   `(Boolean)` - returns true if resource is tabular

#### `resource$source`

-   `(List/String)` - returns `data` or `path` property

Combination of `resource$source` and `resource$inline/local/remote/multipart` provides predictable interface to work with resource data.

#### `resource$headers`

> Only for tabular resources

-   `(String[])` - returns data source headers

#### `resource$schema`

> Only for tabular resources

It returns `Schema` instance to interact with data schema. Read API documentation - [tableschema.Schema](https://github.com/frictionlessdata/tableschema-js#schema).

-   `(tableschema$Schema)` - returns schema class instance

#### `resource$iter(keyed, extended, cast=TRUE, relations=FALSE, stream=FALSE)`

> Only for tabular resources

Iter through the table data and emits rows cast based on table schema (async for loop). Data casting could be disabled.

-   `keyed (Boolean)` - iter keyed rows
-   `extended (Boolean)` - iter extended rows
-   `cast (Boolean)` - disable data casting if false
-   `relations (Boolean)` - if true foreign key fields will be checked and resolved to its references
-   `stream (Boolean)` - return Node Readable Stream of table rows
-   `(errors.DataPackageError)` - raises any error occured in this process
-   `(Iterator/Stream)` - iterator/stream of rows:
-   `[value1, value2]` - base
-   `{header1: value1, header2: value2}` - keyed
-   `[rowNumber, [header1, header2], [value1, value2]]` - extended

#### `resource$read(keyed, extended, cast=TRUE, relations=FALSE, limit)`

> Only for tabular resources

Read the whole table and returns as array of rows. Count of rows could be limited.

-   `keyed (Boolean)` - flag to emit keyed rows
-   `extended (Boolean)` - flag to emit extended rows
-   `cast (Boolean)` - flag to disable data casting if false
-   `relations (Boolean)` - if true foreign key fields will be checked and resolved to its references
-   `limit (Number)` - integer limit of rows to return
-   `(errors.DataPackageError)` - raises any error occured in this process
-   `(Array[])` - returns array of rows (see `table.iter`)

#### `resource$checkRelations()`

> Only for tabular resources

It checks foreign keys and raises an exception if there are integrity issues.

-   `(errors.DataPackageError)` - raises if there are integrity issues
-   `(Boolean)` - returns True if no issues

#### `resource$rawIter({stream=false})`

Iterate over data chunks as bytes. If `stream` is true Node Stream will be returned.

-   `stream (Boolean)` - Node Stream will be returned
-   `(Iterator/Stream)` - returns Iterator/Stream

#### `resource$rawRead()`

Returns resource data as bytes.

-   (Buffer) - returns Buffer with resource data

#### `resource$infer()`

Infer resource metadata like name, format, mediatype, encoding, schema and profile. It commits this changes into resource instance.

-   `(Object)` - returns resource descriptor

#### `resource$commit(strict)`

Update resource instance if there are in-place changes in the descriptor.

-   `strict (Boolean)` - alter `strict` mode for further work
-   `(errors.DataPackageError)` - raises error if something goes wrong
-   `(Boolean)` - returns true on success and false if not modified

#### `resource$save(target)`

> For now only descriptor will be saved.

Save resource to target destination.

-   `target (String)` - path where to save a resource
-   `(errors.DataPackageError)` - raises error if something goes wrong
-   `(Boolean)` - returns true on success

### Profile

A component to represent JSON Schema profile from [Profiles Registry](https://specs.frictionlessdata.io/schemas/registry.json):

``` r
profile = Profile.load('data-package')

profile$name # data-package
```

    ## [1] "data-package"

``` r
profile$jsonschema # List of JSON Schema contents
```

``` r
valid_errors = profile$validate(descriptor)
valid = valid_errors$valid # TRUE if valid descriptor
valid
```

    ## [1] TRUE

#### `Profile.load(profile)`

Constuctor to instantiate `Profile` class.

-   `profile (String)` - profile name in registry or URL to JSON Schema
-   `(errors$DataPackageError)` - raises error if something goes wrong
-   `(Profile)` - returns profile class instance

#### `Profile$name()`

-   `(String/null)` - returns profile name if available

#### `Profile$jsonschema()`

-   `(Object)` - returns profile JSON Schema contents

#### `Profile$validate(descriptor)`

Validate a data package `descriptor` against the Profile$

-   `descriptor (Object)` - retrieved and dereferenced data package descriptor
-   `(Object)` - returns a `valid_errors` object

### Validate

A standalone function to validate a data package descriptor:

``` r
valid_errors = validate('{"name": "Invalid Datapackage"}')
```

#### `validate(descriptor)`

A standalone function to validate a data package descriptor:

-   `descriptor (String/Object)` - data package descriptor (local/remote path or object)
-   `(Object)` - returns a `valid_errors` object

### Infer

A standalone function to infer a data package descriptor.

``` r
descriptor = infer('*.csv')
#{ profile: 'tabular-data-resource',
#  resources:
#   [ { path: 'data/cities.csv',
#       profile: 'tabular-data-resource',
#       encoding: 'utf-8',
#       name: 'cities',
#       format: 'csv',
#       mediatype: 'text/csv',
#       schema: [Object] },
#     { path: 'data/population.csv',
#       profile: 'tabular-data-resource',
#       encoding: 'utf-8',
#       name: 'population',
#       format: 'csv',
#       mediatype: 'text/csv',
#       schema: [Object] } ] }
```

#### `infer(pattern, basePath)`

Infer a data package descriptor.

-   `pattern (String)` - glob file pattern
-   `(Object)` - returns data package descriptor

### Foreign Keys

The library supports foreign keys described in the [Table Schema](http://specs.frictionlessdata.io/table-schema/#foreign-keys) specification. It means if your data package descriptor use `resources[]$schema$foreignKeys` property for some resources a data integrity will be checked on reading operations.

Consider we have a data package:

``` r
DESCRIPTOR = '{
  "resources": [
    {
      "name": "teams",
      "data": [
        ["id", "name", "city"],
        ["1", "Arsenal", "London"],
        ["2", "Real", "Madrid"],
        ["3", "Bayern", "Munich"]
      ],
      "schema": {
        "fields": [
          {"name": "id", "type": "integer"},
          {"name": "name", "type": "string"},
          {"name": "city", "type": "string"}
        ],
        "foreignKeys": [
          {
            "fields": "city",
            "reference": {"resource": "cities", "fields": "name"}
          }
        ]
      }
    }, {
      "name": "cities",
      "data": [
        ["name", "country"],
        ["London", "England"],
        ["Madrid", "Spain"]
      ]
    }
  ]
}'
```

Let's check relations for a `teams` resource:

``` r
package = Package.load(DESCRIPTOR)
# teams = package$getResource('teams')
# teams$checkRelations()
# tableschema.exceptions.RelationError: Foreign key "['city']" violation in row "4"
```

As we could see there is a foreign key violation. That's because our lookup table `cities` doesn't have a city of `Munich` but we have a team from there. We need to fix it in `cities` resource:

``` r
package$descriptor[['resources']][1]['data']$push(['Munich', 'Germany'])
package$commit()
teams = package$getResource('teams')
await teams$checkRelations()
# TRUE
```

Fixed! But not only a check operation is available. We could use `relations` argument for `resource$iter/read` methods to dereference a resource relations:

``` r
teams$read('{"keyed": true, "relations": true}')
#[{'id': 1, 'name': 'Arsenal', 'city': {'name': 'London', 'country': 'England}},
# {'id': 2, 'name': 'Real', 'city': {'name': 'Madrid', 'country': 'Spain}},
# {'id': 3, 'name': 'Bayern', 'city': {'name': 'Munich', 'country': 'Germany}}]
```

Instead of plain city name we've got a dictionary containing a city data. These `resource$iter/read` methods will fail with the same as `resource$check_relations` error if there is an integrity issue. But only if `relations = TRUE` flag is passed.

### Errors

#### `errors$DataPackageError`

Base class for the all library errors. If there are more than one error you could get an additional information from the error object:

``` r
tryCatch({
  # some lib action
}, error = function() {
  error # you have N cast errors (see error.errors)
  if (error$multiple) {
    for ( error in error$errors) {
        error # cast error M is ...
    }
  }
})
```

Changelog - News
----------------

In [NEWS.md](https://github.com/okgreece/datapackage-r/blob/master/NEWS.md) described only breaking and the most important changes. The full changelog could be found in nicely formatted [commit](https://github.com/okgreece/datapackage-r/commits/master) history.

Contributing
============

The project follows the [Open Knowledge International coding standards](https://github.com/okfn/coding-standards). There are common commands to work with the project.Recommended way to get started is to create, activate and load the library environment. To install package and development dependencies into active environment:

``` r
devtools::install_github("okgreece/datapackage-r", dependencies=TRUE)
```

To make test:

``` r
  test_that(description, {
    expect_equal(test, expected result)
  })
```

To run tests:

``` r
devtools::test()
```

more detailed information about how to create and run tests you can find in [testthat package](https://github.com/hadley/testthat)

Github
======

-   <https://github.com/okgreece/datapackage-r>

<img src="okgr.png" align="right" width=120px /><img src="oklabs.png" align="right" width=120px />