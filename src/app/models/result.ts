export class respuesta{
  //datos usados para predecir
  predict_texto_data: any[];
  predict_multi_data: any[];
  // prediction category or numeric
  predict_texto_predic: any[];
  predict_multi_predic: any[];
  // tipo column
  predict_texto_column: any[];
  predict_multi_column: any[]
  constructor(
  predict_texto_data: any[],
  predict_multi_data: any[],
  // prediction category or numeric
  predict_texto_predic: any[],
  predict_multi_predic: any[],
  // tipo column
  predict_texto_column: any[],
  predict_multi_column: any[]
  ){
    this.predict_texto_data = predict_texto_data;
    this.predict_multi_data = predict_multi_data;
    this.predict_texto_predic = predict_texto_predic;
    this.predict_multi_predic = predict_multi_predic;
    this.predict_texto_column = predict_texto_column;
    this.predict_multi_column = predict_multi_column;
  }
}

export class var_cat{
  varres: string;
  cat: any[];
  count: any[]
  constructor(
  varres: string,
  cat: any[],
  count: any[]
  ){
    this.varres = varres;
    this.cat = cat;
    this.count = count;
  }
}

export class var_num{
  varres: string;
  x: any[];
  y: any[];
  std: any[];
  std_val: any[]

  constructor(
  varres: string,
  x: any[],
  y: any[],
  std: any[],
  std_val: any[]
  ){
    this.varres = varres;
    this.x = x;
    this.y = y;
    this.std = std;
    this.std_val = std_val;
  }
}
