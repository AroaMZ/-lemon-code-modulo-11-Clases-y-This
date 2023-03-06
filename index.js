const reservas = [
  {
    tipoHabitacion: "standard",
    pax: 1,
    noches: 3,
    desayuno: true,
  },
  {
    tipoHabitacion: "standard",
    pax: 1,
    noches: 4,
    desayuno: false,
  },
  {
    tipoHabitacion: "suite",
    pax: 2,
    noches: 1,
    desayuno: true,
  },
];

// Clase generica de reserva
class reserva {
  constructor(reservas) {
    this._reservas = reservas;
    this._total = 0;
    this._iva = 0.21;
    this._standard = 0;
    this._suite = 0;
    this._importeNoches = 0;
    this._importeDesayuno = 0;
  }

  calculoNoches() {
    let acumulado = 0;
    for (let i = 0; i < this._reservas.length; i++) {
      if (this._reservas[i].tipoHabitacion === "standard") {
        acumulado = acumulado + this._standard * this._reservas[i].noches;
      } else if (this._reservas[i].tipoHabitacion === "suite") {
        acumulado = acumulado + this._suite * this._reservas[i].noches;
      }
    }
    this._importeNoches= acumulado;
  }
  // calcular coste extra por desayuno
  calculoDesayuno() {
    let precioPersonaDesayuno = 0;
    for (let i = 0; i < this._reservas.length; i++) {
      if (this._reservas[i].desayuno === true) {
        precioPersonaDesayuno =  precioPersonaDesayuno + (this._reservas[i].noches * (this._reservas[i].pax * 15));
      } 
    }
    this._importeDesayuno = precioPersonaDesayuno
  }
  // calcular precio total (subtotal + 21% IVA)
  calculoTotal(){
    this.calculoSubtotal()
        this._total = this._subtotal + this._subtotal * 0.21
  }
}
// Clase que hereda de reserva para las reservas de clientes
class reservaPorCliente extends reserva {
  constructor(reservas) {
    super(reservas);
    this._standard = 100;
    this._suite = 150;
    this._iva = 0.21;
    this._subtotal = 0;
    this._importePersonasExtra = 0;
  }
  calculoSubtotal(){
    this.calculoNoches()
    this.calculoPersonaAdicional()
    this.calculoDesayuno()
    this._subtotal = this._importeNoches + this._importeDesayuno + this._importePersonasExtra
  }
 
  // calcular coste extra en funcion de las personas que duermen en la habitacion

  calculoPersonaAdicional() {
    let personaAdicional = 0;
    for (let i = 0; i < this._reservas.length; i++) {
      if (this._reservas[i].pax > 1) {
        personaAdicional = this._reservas[i].pax * 40;
      }
    }
    this._importePersonasExtra = personaAdicional;
  }
}
// Clase que hereda de reserva para las reservas de touroperadores

 class reservaPorTour extends reserva {
    constructor(reservas) {
        super(reservas);
        this._standard = 100;
        this._suite = 100;
        this.descuento = 0.15;
    }
    // calcular el subtotal usando la funcion de la clase padre
    calculoSubtotal(){
        this.calculoNoches()
        this.calculoDesayuno()
        this._subtotal = this._importeNoches + this._importeDesayuno;
        this.calculoDescuento()
      }
    // calcular el total de la reserva con el descuento aplicado
    calculoDescuento(){
        this._subtotal = this._subtotal - this._subtotal * this.descuento;
    }
}
const reservaCliente = new reservaPorCliente(reservas);
reservaCliente.calculoTotal();
console.log("reserva individual ", reservaCliente._total);
const reservaTour = new reservaPorTour(reservas);
reservaTour.calculoTotal();
console.log("reserva Tour ", reservaTour._total);


