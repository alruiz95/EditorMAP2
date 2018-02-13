import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { Parameters } from '../parameters';

interface Parametros {
  content: string;
  user: string;
}

@Component({
  selector: 'app-editor-ide',
  templateUrl: './editor-ide.component.html',
  styleUrls: ['./editor-ide.component.css']
})
export class EditorIdeComponent implements OnInit {

  //baseUrl = 'http://localhost:36532/api/MapCompiler';
  baseUrl = 'http://vbuctranslator.azurewebsites.net/api/MapCompiler';

  constructor( private http: HttpClient) { }

   /**
   * Summary:
   *    Fuction executed on the inicialization of EditIDE Component
   **/
  ngOnInit() {
    const textareas = document.getElementsByTagName('textarea');
    // tslint:disable-next-line:no-var-keyword
    for (var i = 0; i < textareas.length; i++) {
      this.enableTab(textareas.item(i).id);
    }
  }


  /**
   * Summary:
   *    Enables TAB key in to the a Text Area given.
   * Params:
   *    ID -> ID in the .html file of the Text area
   **/
  enableTab(id) {
    //const el = document.getElementById(id);
    //el.onkeydown = function(e) {
    //    if (e.keyCode === 9) { // tab was pressed

            // get caret position/selection
    //        const val = this.value,
    //            start = this.selectionStart,
    //            end = this.selectionEnd;

            // set textarea value to: text before caret + tab + text after caret
    //        this.value = val.substring(0, start) + '\t' + val.substring(end);

            // put caret at right position again
    //        this.selectionStart = this.selectionEnd = start + 1;

            // prevent the focus lose
    //        return false;

    //    }
    //};
  }

   /**
   * Summary:
   *    Fuction called from the summit Button in the .html to compile what is in the Text Area.
   * Params:
   *    form -> Resives the Form with all its' inputs.
   **/
  compileMap(form: NgForm) {
    this.postCompile({
      content: form.value.codigoMap,
      user: 'TestFromDummy2'
    });
    console.log('==================');
  }

  /**
   * Summary:
   *    Fuction that calls the API sending the content of Text Editor and the username to compile the .map
   * Params:
   *    model -> Content and username in Json Format.
   * Returns:
   *    model -> Responce of the API with Same content and username !!!!! SHOULD BE RETURNING THE DLL RUTE FILE TO DOWNLOAD !!!!!
   **/
  postCompile(model: any) {

    const resq = this.http.post( this.baseUrl, model)
    .subscribe (data => {
      console.log(data);
      model = data;
    },
    (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
        console.log('Client Side Error');
      } else {
        console.log('Server Error Occured');
      }
    });

    return model;
  }

}
