import { inject, Injectable } from '@angular/core';
import {  MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';


/**
 * Service to add new svg icons
 * 
 * @method registerIconRessource register svg from html-file
 * @method registerIconHtml register svg from string literal ``
 * 
 * See also {@link README.md} @document Readme.md
 */
@Injectable({
  providedIn: 'root',
})
export class NgtSvgRegistryService {

  readonly iconRegistry= inject(MatIconRegistry);
  readonly sanitizer = inject(DomSanitizer);

  /** 
   * Register svg from html-file from your app assets
   * 
   * @param {string} name - svg name to call from mat-icon, i.e. <mat-icon svgIcon="mySvgName" />
   * @param {string} url - file path to the svg file relative to your apps assets folders (i.e. public/assets)
   * To see how to expose library assets see README.md
   */
  registerIconRessource(name: string, url: string){
    this.iconRegistry.addSvgIcon(name,  this.sanitizer.bypassSecurityTrustResourceUrl(url));
  }

  /** 
   * Register svg from string literal
   * 
   * @param {string} name - svg name to call from mat-icon, i.e. <mat-icon svgIcon="mySvgName" />
   * @param {string} html - svg as string i.e. const mySvg =  `<svg> ... </svg>`;
   */
  registerIconHtml(name: string, html: string){
    this.iconRegistry.addSvgIconLiteral(name, this.sanitizer.bypassSecurityTrustHtml(html));
  }
  
}
