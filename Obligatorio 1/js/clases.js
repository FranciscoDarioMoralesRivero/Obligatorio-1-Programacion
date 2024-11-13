class Empresa {
	
	constructor(nombre,direccion,rut) {
		
		this.nombre=nombre;
		this.direccion= direccion;
		this.rut=rut;
	}
	toString(){
		return this.nombre + " - " + this.rut;
	}

}

class Funcion {
	constructor(nombre,descripcion,tipo) {
		this.nombre=nombre;
		this.descripcion= descripcion;
		this.tipo=tipo;
	}

}

class Puesto{
	constructor(empresa, funcion, detalle, sueldo){
		this.empresa=empresa;
		this.funcion= funcion;
		this.detalle= detalle;
		this.sueldo=sueldo;
	}


}	
class Sistema {
	constructor(){
		this.listaEmpresas=[];
		this.listaFunciones=[];
		this.listaPuestos=[];
	}
	agregarEmpresa(unElemento){
		this.listaEmpresas.push(unElemento);
	}
	agregarFuncion(unElemento){
		this.listaFunciones.push(unElemento);
	}
	agregarPuesto(unElemento){
		this.listaPuestos.push(unElemento);
	}
	existeEmpresaDeRUT(elRUT){
		let existe = false;
		for(let e of this.listaEmpresas){
			if(e.rut == elRUT){
				existe = true;
			}
		}
		return existe;
	}
	
}
