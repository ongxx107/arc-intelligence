# SVG Icons

We use the material svg registry to register new svg icons.
Possible formats are:
 - Literals : `<svg> ... </svg>`
 - Files in the app's public folder 
 - Files from the library's asset folder

## Literals

Strings with svg html content can be loaded any application file. There are also exported svg string constants available from the library. 

Import the library's svg registry, inject it and call the register command to name and add the icon: 
``` 
import {inject} from '@angular/core';
import {NgtSvgRegistry, SOME_LIB_SVG} from '@corporate/ng-base-components';

myStringConstant = `<svg> ... </svg>`; // or myStringConstant = SOME_LIB_SVG;

svgRegistry = inject(NgtSvgRegistry);

svgRegistry.registerIconHtml('my-icon-name', myStringConstant);
```


## Public files

Files with svgs as html content can be loaded from the public folder of the consuming application. This folder is generally located at the highest level of the application on the same level as the src folder and needs to be added to the angular.json configuration:
```
{ 
    ...,
    "my-app": {
        "architect":{
            "build": {
                "options": {
                    "assets": [
                    {
                        "glob": "**/*",
                        "input": "my-app/public"
                    }
                    ],
                    ...
                }
                ...
            }
            ...
        }
        ...
    }
}
```

Import the library's svg registry, inject it and call the register command to name and add the icon: 
``` 
import {inject} from '@angular/core';
import {NgtSvgRegistry} from '@corporate/ng-base-components';

svgRegistry = inject(NgtSvgRegistry);

svgRegistry.registerIconRessource('my-icon-name', 'path/relative/to/public/directory/file.svg');
```


## Library assets files

Files with svgs as html content can be loaded from the assets folder of the library. To import the assets they need to be added to the package.json configuration of the consuming application:

```
{ 
    ...,
    "my-app": {
        "architect":{
            "build": {
                "options": {
                    "assets": [
                    {
                        "glob": "**/*",
                        "input": "dist/ng-base-components/assets",
                        "output": "/assets/"
                    }
                    ],
                    ...
                }
                ...
            }
            ...
        }
        ...
    }
}
```

Import the library's svg registry, inject it and call the register command to name and add the icon:
``` 
import {inject} from '@angular/core';
import {NgtSvgRegistry} from '@corporate/ng-base-components';

svgRegistry = inject(NgtSvgRegistry);

svgRegistry.registerIconRessource('my-icon-name', 'assets/my-file.svg');
```
