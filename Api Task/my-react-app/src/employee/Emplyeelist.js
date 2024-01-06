import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { Rating } from 'primereact/rating';
import { Toolbar } from 'primereact/toolbar';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';
import { Api_url } from '../api/Url';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { producdservice } from 'react';
export const Emplyeelist = () => {
  // const nav = useNavigate();
  // const [apiData, setApiData] = useState([]);

  // const callApi = async () => {
   
  //     let resp = await axios.get(Api_url);
  //     setApiData(resp.data);
  //   } 
  
  // useEffect(() => {
  //   callApi();
  // }, []);
  // const edit = async (id) => {
  //   nav(`/form/${id}`);
  // };
  // const Delete = async (index, id) => {
  
  //     await axios.delete(Api_url + id);
  //     setApiData((preventArray) =>
  //       preventArray.filter((val, i) => i !== index)
  //     );
    
  // };
  let emptyProduct = {
    name: '',
    email: '',
    employeeid: '',
    date: '', 
    Job: '',
    Attendance: ''
};
const nav=useNavigate();
const [products, setProducts] = useState(null);
const [productDialog, setProductDialog] = useState(false);
const [deleteProductDialog, setDeleteProductDialog] = useState(false);
const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
const [product, setProduct] = useState(emptyProduct);
const [selectedProducts, setSelectedProducts] = useState(null);
const [submitted, setSubmitted] = useState(false);
const [globalFilter, setGlobalFilter] = useState(null);
const toast = useRef(null);
const dt = useRef(null);


const [loading, setLoading] = useState(false);
const [totalRecords, setTotalRecords] = useState(0);
// const [producds, setproducds] = useState(null);
const [selectAll, setSelectAll] = useState(false);
const [selectedproducds, setSelectedproducds] = useState(null);
const [lazyState, setlazyState] = useState({
    first: 0,
    rows: 10,
    page: 1,
    sortField: null,
    sortOrder: null,
    filters: {
       
        name: { value: '', matchMode: 'contains' },
        'country.name': { value: '', matchMode: 'contains' },
        company: { value: '', matchMode: 'contains' },
        'representative.name': { value: '', matchMode: 'contains' }
    }
});
let networkTimeout = null;
useEffect(() => {
    loadLazyData();
}, [lazyState]);

const loadLazyData = () => {
    setLoading(true);

    if (networkTimeout) {
        clearTimeout(networkTimeout);
    }

    // networkTimeout = setTimeout(() => {
    //     producdservice.getproducds({ lazyEvent: JSON.stringify(lazyState) }).then((data) => {
    //         setTotalRecords(data.totalRecords);
    //         setProducts(data.producds);
    //         setLoading(false);
    //     });
    // }, Math.random() * 1000 + 250);
};

const onPage = (event) => {
    setlazyState(event);
};

const onSort = (event) => {
    setlazyState(event);
};

const filter = (event) => {
    event['first'] = 0;
    setlazyState(event);
};
const onSelectionChange = (event) => {
    const value = event.value;

    setSelectedproducds(value);
    setSelectAll(value.length === totalRecords);
};

const onSelectAllChange = (event) => {
    const selectAll = event.checked;

    if (selectAll) {
        producdservice.getproducds().then((data) => {
            setSelectAll(true);
            setSelectedproducds(data.producds);
        });
    } else {
        setSelectAll(false);
        setSelectedproducds([]);
    }
};
useEffect(() => {
     const callApi = async () => {
   
      let resp = await axios.get(Api_url);
      console.log(resp)
      setProducts(resp.data);
    } 
    callApi()
    
}, []);

const formatCurrency = (value) => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
};

const openNew = () => {
    setProduct(emptyProduct);
    setSubmitted(false);
    setProductDialog(true);
};

const hideDialog = () => {
    setSubmitted(false);
    setProductDialog(false);
};

const hideDeleteProductDialog = () => {
    setDeleteProductDialog(false);
};

const hideDeleteProductsDialog = () => {
    setDeleteProductsDialog(false);
};
          
const saveProduct = () => {
    setSubmitted(true);

    if (product.name.trim()) {
        let _products = [...products];
        let _product = { ...product };

        if (product.id) {
            const index = findIndexById(product.id);

            _products[index] = _product;
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
        } else {
            _product.id = createId();
            _product.image = 'product-placeholder.svg';
            _products.push(_product);
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
        }

        setProducts(_products);
        setProductDialog(false);
        setProduct(emptyProduct);
    }
};

const editProduct = (product) => {
    setProduct({ ...product });
    // setProductDialog(true);
    const edit = async () => {
    nav(`/form/${product.id}`);
};
        edit()
};

const confirmDeleteProduct = (product) => {
    setProduct(product);
    setDeleteProductDialog(true);
};

const deleteProduct = () => {
     const res =   axios.delete(Api_url + product.id );
    let _products = products.filter((val) => val.id !== product.id);

    setProducts(_products);
    setDeleteProductDialog(false);
    setProduct(emptyProduct);
    toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
};

const findIndexById = (id) => {
    let index = -1;

    for (let i = 0; i < products.length; i++) {
        if (products[i].id === id) {
            index = i;
            break;
        }
    }

    return index;
};

const createId = () => {
    let id = '';
    let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 5; i++) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return id;
};

const exportCSV = () => {
    dt.current.exportCSV();
};

const confirmDeleteSelected = () => {
    setDeleteProductsDialog(true);
};

const deleteSelectedProducts = async () => {
    if (selectedProducts.length > 0) { 
        try {
          for (const product of selectedProducts) {
            await axios.delete(`${Api_url}/${product.id}`);
          }
          const updatedProducts = products.filter((val) =>
            !selectedProducts.some((selectedProduct) => selectedProduct.id === val.id)
          );
    
          setProducts(updatedProducts);
    
          setDeleteProductsDialog(false);
          setSelectedProducts([]);
          toast.current.show({
            severity: "success",
            summary: "Successful",
            detail: "Products Deleted",
            life: 3000,
          });
        } catch (err) {
          console.error("Error deleting Products", err);
        }
      } else {
        console.warn("No products selected for deletion.");
    }
        // let _products = products.filter((val) => !selectedProducts.includes(val));

    // setProducts(_products);
    // setDeleteProductsDialog(false);
    // setSelectedProducts(null);
    // toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
};

const onCategoryChange = (e) => {
    let _product = { ...product };

    _product['category'] = e.value;
    setProduct(_product);
};

const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || '';
    let _product = { ...product };

    _product[`${name}`] = val;

    setProduct(_product);
};

const onInputNumberChange = (e, name) => {
    const val = e.value || 0;
    let _product = { ...product };

    _product[`${name}`] = val;

    setProduct(_product);
};

const leftToolbarTemplate = () => {
    return (
        <div className="flex flex-wrap gap-2">
            <Button label="New" icon="pi pi-plus" severity="success" onClick={openNew} />
            <Button label="Delete" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected} disabled={!selectedProducts || !selectedProducts.length} />
        </div>
    );
};

const rightToolbarTemplate = () => {
    return <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />;
};

const imageBodyTemplate = (rowData) => {
    return <img src={`https://primefaces.org/cdn/primereact/images/product/${rowData.image}`} alt={rowData.image} className="shadow-2 border-round" style={{ width: '64px' }} />;
};

const priceBodyTemplate = (rowData) => {
    return formatCurrency(rowData.price);
};

const ratingBodyTemplate = (rowData) => {
    return <Rating value={rowData.rating} readOnly cancel={false} />;
};

const statusBodyTemplate = (rowData) => {
    return <Tag value={rowData.Attendance} severity={getSeverity(rowData)}></Tag>;
};

const actionBodyTemplate = (rowData) => {
    return (
        <React.Fragment>
            <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => editProduct(rowData)} />
            <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteProduct(rowData)} />
        </React.Fragment>
    );
};

const getSeverity = (product) => {
    switch (product.Attendance) {
        case 'Present':
            return 'success';

        case 'Absent':
            return 'danger';
        default:
            return null;
    }
};

const header = (
    <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
        <h4 className="m-0">Manage Products</h4>
        <span className="p-input-icon-left">
            <i className="pi pi-search" />
            <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
        </span>
    </div>
);
const productDialogFooter = (
    <React.Fragment>
        <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
        <Button label="Save" icon="pi pi-check" onClick={saveProduct} />
    </React.Fragment>
);
const deleteProductDialogFooter = (
    <React.Fragment>
        <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteProductDialog} />
        <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteProduct} />
    </React.Fragment>
);
const deleteProductsDialogFooter = (
    <React.Fragment>
        <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteProductsDialog} />
        <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteSelectedProducts} />
    </React.Fragment>
);


  return (
    <div className=" mt-5 container ">
       <Toast ref={toast} />
            <div className="card">
                <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

                <DataTable ref={dt} value={products} lazy filterDisplay="row" first={lazyState.first} selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)}
                        dataKey="id"  sortField={lazyState.sortField}  onSelectAllChange={onSelectAllChange}
                        sortOrder={lazyState.sortOrder} onSort={onSort} filter={filter} onPage={onPage}
                       paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products" globalFilter={globalFilter} header={header} >
                    <Column selectionMode="multiple" exportable={false}></Column>
                    {/* <Column field="code" header="Code" sortable style={{ minWidth: '12rem' }}></Column> */}
                    <Column field="name" header="Name" sortable filter filterPlaceholder="Search by name" style={{ minWidth: '12rem' }}></Column>
                    <Column field="email" header="Email" sortable filter filterPlaceholder="Search by email" style={{ minWidth: '12rem' }}></Column>
                    <Column field="employeeid" header="EmployeeId" sortable filter filterPlaceholder="Search by employeeid" style={{ minWidth: '12rem' }}></Column>
                    <Column field="date" header="Date" sortable  filter filterPlaceholder="Search by date" style={{ minWidth: '12rem' }}></Column>
                    <Column field="Attendance" header="Attendance" filter filterPlaceholder="Search by Attendance" body={statusBodyTemplate} sortable style={{ minWidth: '12rem' }}></Column>
                    <Column field="Job" header="Job" sortable filter filterPlaceholder="Search by Job" style={{ minWidth: '12rem' }}></Column>
                    <Column body={actionBodyTemplate} header="Action" exportable={false} style={{ minWidth: '12rem' }}></Column>
                </DataTable>
            </div>
            <Dialog visible={deleteProductDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {product && (
                        <span>
                            Are you sure you want to delete <b>{product.name}</b>?
                        </span>
                    )}
                </div>
            </Dialog>

            <Dialog visible={deleteProductsDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteProductsDialogFooter} onHide={hideDeleteProductsDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {product && <span>Are you sure you want to delete the selected products?</span>}
                </div>
            </Dialog>
      {/* <div className="tableform">
        <table className="table table-bordered  table-striped">
          <thead>
            <tr>
              <th scope="col">S.No</th>
              <th scope="col">Name</th>
              <th scope="col">Email Id</th>
              <th scope="col">Employee ID</th>
              <th scope="col">Join Date</th>
              <th scope="col">Attendance</th>
              <th scope="col">Job</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {apiData.map((data, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{data.name}</td>
                <td>{data.email}</td>
                <td>{data.employeeid}</td>
                <td>{data.date}</td>
                <td body={statusBodyTemplate}>{data.Attendance}</td>
                <td>{data.Job}</td>
                <td>
                  <button
                    type="submit"
                    className="rounded-2 btn btn-primary"
                    onClick={() => edit(data.id)}
                  >
                    Edit
                  </button>{" "}
                  <button
                    type="submit"
                    className=" btn btn-danger rounded-2 pe-5"
                    onClick={() => Delete(index, data.id)}
                  >
                  Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> */}
    </div>
  );
};
