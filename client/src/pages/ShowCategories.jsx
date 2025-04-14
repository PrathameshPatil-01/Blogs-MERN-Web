import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { toast } from 'react-toastify';
import { showCategories } from '../services/category';

function ShowCategories() {

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    categoryList();
  }, [])

  const categoryList = async () => {
    const result = await showCategories()
    console.log(result);

    if (result['status'] == 'success') {
      console.log("All blogs shown succesfully");
      toast.success("All blogs shown succesfully")
      setCategories([...result.data])
    }
    else {
      toast.error(result.error.sqlMessage)
    }
  }


  return (
    <div>
      <Navbar />
      <div className='container mx-auto mt-4'>
        <table className="table table-dark table-striped">
          <thead>
            <tr>
              <th >Id</th>
              <th >Title</th>
              <th >Description</th>
            </tr>
          </thead>
          <tbody>
            {categories && categories.map((category) => {
              return (
                <tr key={category.id}>
                  <td>{category.id}</td>
                  <td>{category.title}</td>
                  <td>{category.description}</td>
                </tr>
              )
            }
            )}

          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ShowCategories
