/*https://lacodigoteca.com/javascript/angular/convertir-base64-a-pdf-xls-doc/
.pdf	application/pdf
.docx	application/vnd.openxmlformats-officedocument.wordprocessingml.document
.xlsx	application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
.xml	text/xml
.jpg  image/jpeg
.png  image/png
*/

export class demo_doc{

  constructor(
    public name_doc: string,
    public type_doc: string
  ){}

}
