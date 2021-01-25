import React, { Component } from 'react'
import axios from 'axios'
import ReactTable from "react-table"; 
import 'react-table/react-table.css'

export default class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      products: [],
      loading:true
    }
  }
  async getUsersData(){
    const res = await axios.get('https://app.getrecall.com/api/products')
    console.log(res.data)
    this.setState({loading:false, products: res.data.products})
  }
  componentDidMount(){
    this.getUsersData()
  }

  render() {
    const columns = [{  
      Header: 'Features',  
      accessor: 'features',
     }
     ,{  
      Header: 'Id',  
      accessor: '_id' ,
      }
     
     ,{  
     Header: 'Name',  
     accessor: 'name' ,
     }
     ,{  
     Header: 'Description',  
     accessor: 'description',
     },
     {  
      Header: 'Category',  
      accessor: 'category',
      filterable: true,
      filterMethod: (filter, row) => {
        if (filter.value === "all") {
          return true;
        }
        if (filter.value === "GPU And Edge AI") {
          return row[filter.id] === "GPU & Edge AI";
        }
        if (filter.value === "Embedded Flash Storage") {
          return row[filter.id] === "Embedded Flash Storage";
        }
      },
      Filter: ({ filter, onChange }) => (
        <select
          onChange={event => onChange(event.target.value)}
          style={{ width: "100%" }}
          value={filter ? filter.value : "all"}
        >
          <option value="all">Show All</option>
          <option value="GPU And Edge AI">GPU And Edge AI</option>
          <option value="Embedded Flash Storage">Embedded Flash Storage</option>
        </select>
      )
      },
      {  
        Header: 'Subcategory',  
        accessor: 'subcategory',
        },
        {  
          Header: 'Created At',  
          accessor: 'createdAt',
          },
          {  
            Header: 'Updated At',  
            accessor: 'updatedAt',
            },
            {  
              Header: 'Model Id',  
              accessor: 'modelId',
              },
              {  
                Header: 'PID',  
                accessor: 'pid',
                },
                {  
                  Header: 'Datasheet',  
                  accessor: 'datasheet',
                  },
                  {  
                    Header: 'Link',  
                    accessor: 'link',
                    },
                    {  
                      Header: 'Thumbnail',
                      Cell: (row) => {
                        return <div><img height={34} src={row.original.thumbnail}/></div>
                      },
                      accessor: 'thumbnail',
                      }
  ]
    return (
      <ReactTable  
      data={this.state.products}  
      columns={columns}  
   />
    )
  }
}
 