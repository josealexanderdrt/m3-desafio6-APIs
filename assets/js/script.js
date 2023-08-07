 const form = document.getElementById('calculadora');
 const chart = document.getElementById('myChart');
 let myChart;

 const obtenerDatosMoneda = async (moneda) => {
    try{
    const valores = await fetch(`https://mindicador.cl/api/${moneda}`);
    const resultados = await valores.json();
    console.log(resultados)
    return resultados.serie;
    }catch (error) {
    alert(error.message);
 }
 };
 obtenerDatosMoneda()

 const calcularTotalEnMoneda = (valor, datos) =>{
    const valorMoneda = datos[0].valor
    const total = valor/ valorMoneda
    return Math.round(total *100/100);
 };

 const mostarTotalEnPantalla = (total) =>{
    document.getElementById("total-valor").innerHTML = total;
 };

 const obtenerValores = (datos) => {
    return datos.map((item) => item.valor);
 };

 const ObtenerFechas = () => {
    return datos.map((item) => new Date(item.fecha).toLocaleDateString("en-US"));
 };

const destruirGraficoAnterior = () =>{
    if (myChart){
        myChart.destroy();
    }
};

const calcularValorEnMoneda = async (valor, moneda) => {
    const datos = await obtenerDatosMoneda(moneda);
    mostrarGrafico(datos,valor);
};

const mostrarGrafico = (datos, valores) =>{
    const total = calcularTotalEnMoneda(valor, datos);
    mostarTotalEnPantalla (total);

    const labels = ObtenerFechas(datos);
    const values = obtenerValores(datos);

    const datasets = [{
        label: 'moneda',
        borderColor: ' 1px solid black',
        data: values 
    },];

    const config = {
        type: "line",
        data: {labels, datasets}
    }

    destruirGraficoAnterior();

    chart.style.backgroundColor = "red";
 
    myChart = new Chart (chart, config);
}

form.addEventListener("click", async (event) =>{
    event.preventDefault()
    const valor = form.elements['valor'].value;
    const moneda = form.elements['moneda'].value;

    await calcularValorEnMoneda(valor, moneda);
})