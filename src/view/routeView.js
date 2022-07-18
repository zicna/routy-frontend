
const routesContainer = document.querySelector('.routes-container')

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
            `
            routesContainer.appendChild(li)
        });
    }

    clear(){
        routesContainer.innerHTML = '';
    }

}

export default new RouteView()