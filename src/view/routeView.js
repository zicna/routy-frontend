
const routesContainer = document.querySelector('.routes-container')
const routesList = document.querySelector(".route-list")
class RouteView{
    _data;
    render(data){
        this._data = data
        this.clear()
        this.generateMarkup()
    }

    generateMarkup(){
        this._data.forEach(element => {
            const li = document.createElement('li')
            li.innerHTML = `
            ${element}
            <button class="btn btn-delete">X</button>
            `
            routesList.appendChild(li)
        });
    }

    clear(){
        routesList.innerHTML = '';
    }

}

export default new RouteView()