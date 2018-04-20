import React, {Component} from 'react';
import './style/table.css';

export default class Table extends Component{
    prepareData(){
        if(this.props.content){
            var words = this.props.content;
            const wordsNew = words.replace(/\r/g, "")
            const ubigeos = wordsNew.split("\n"); // string
            let ubigeosNew = ubigeos.map((n)=>n.substring(1,n.length-1))
            ubigeosNew = ubigeosNew.map(n=>n.split("/").map(cell=>cell.trim()));

            const departments = ubigeosNew.filter(this.isDepartment)
                .map(this.splitCodesAndNames)
                .map(arr => arr[0])
                .map(arr => this.buildTableObj(arr[0], arr[1]))

            const provinces = ubigeosNew.filter(this.isProvince)
                .map(this.splitCodesAndNames)
                .map(arr => arr.slice(0,2))
                .map(arr => this.buildTableObj(arr[1][0], arr[1][1], arr[0][0], arr[0][1]))

            const districts = ubigeosNew.filter(this.isDistrict)
                .map(this.splitCodesAndNames)
                .map(arr => this.buildTableObj(arr[2][0], arr[2][1], arr[1][0], arr[1][1]))

            console.log(({departments, provinces, districts}));
            this.tableData = {departments, provinces, districts}
        }else{
            this.tableData = undefined;
        }

    }

    isDepartment(row){
        return row[0].length > 0 && row[1].length === 0 && 
            row[2].length === 0;
    }

    isProvince(row){
        return row[0].length > 0 && row[1].length > 0 && 
        row[2].length === 0;
    }

    isDistrict(row){
        return row[0].length > 0 && row[1].length > 0 && 
        row[2].length > 0;
    }

    splitCodesAndNames(row){
        return row.map(str => [str.substring(0,str.indexOf(' ')),
                str.substring(str.indexOf(' ')+1)])
    }

    buildTableObj(code, name, parentCode="-", parentDescription="-"){
        return { code, name, parentCode, parentDescription }
    }

    prepareTableRow(item){
        return(
            <tr>
                <td>{item.code}</td>
                <td>{item.name}</td>
                <td>{item.parentCode}</td>
                <td>{item.parentDescription}</td>
            </tr>
        )
    }


    render(){
        this.prepareData();
        if(this.tableData){
        
            const tablesHeader = <tr>
                <th>Código</th>
                <th>Nombre</th>
                <th>Código Padre</th>
                <th>Descripción</th>
            </tr>

            const rowsDepartments = this.tableData.departments.map(this.prepareTableRow)
            const tableDepartments = <table><tbody>{tablesHeader}{rowsDepartments}</tbody></table>

            const rowsProvinces = this.tableData.provinces.map(this.prepareTableRow)
            const tableProvinces = <table><tbody>{tablesHeader}{rowsProvinces}</tbody></table>

            const rowsDistricts = this.tableData.districts.map(this.prepareTableRow)
            const tableDistricts = <table><tbody>{tablesHeader}{rowsDistricts}</tbody></table>


            return(
                <div>
                    <div className="table_container">
                        <h2>Departamentos</h2>
                        {tableDepartments}
                    
                        <h2>Provincias</h2>
                        {tableProvinces}
                        <h2>Distritos</h2>
                        {tableDistricts}
                    </div>
                </div>
            )
        }else{
            return(
                <div>
                    Seleccione un archivo
                </div>
            )
        }
    }
}