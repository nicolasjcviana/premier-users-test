import React, { useState, useEffect } from 'react';
import UserService from '../services/user.service';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import { Pencil, Trash, PersonPlus } from 'react-bootstrap-icons';
import DataTable from 'react-data-table-component';

export default function UserList(props) {

    const [users, setUsers] = useState([]);
    const [total, setTotal] = useState();
    const [pageSize, setPageSize] = useState(5);
    const history = useHistory();
    const service = new UserService();

    const listUsers = async (page) => {
        const response = await service.getAll(page, pageSize);
        setUsers(response.data.rows);
        setTotal(response.data.count);
    }

    const removeUser = async (id) => {
        await service.delete(id);
        await listUsers(1);
    }

    useEffect(() => {
        listUsers();
    }, [])

    return (
        <div className="container">
            <div className="row justify-content-between">
                <div className="col-8">
                    <h4>Usuários cadastrados</h4>
                </div>
                <div className="col" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <button type="button" className="btn btn-outline-primary btn-sm" onClick={() => history.push(`users/add`)}><PersonPlus /> Adicionar </button>
                </div>
            </div>
            <div>
                <DataTable
                    columns={[
                        {
                            name: 'Nome',
                            selector: 'name'
                        },
                        {
                            name: 'E-mail',
                            selector: 'email'
                        },
                        {
                            name: 'Data de nascimento',
                            cell: row => moment(row.birthDate, 'YYYY-MM-DD').format('DD/MM/YYYY')
                        },
                        {
                            name: 'Ações',
                            cell: row => <div>
                                <button style={{ marginRight: '8px' }} type="button" className="btn btn-outline-warning btn-sm" onClick={() => history.push(`users/edit/${row.id}`)}><Pencil /> </button>
                                <button type="button" className="btn btn-outline-danger btn-sm" onClick={() => removeUser(row.id)}><Trash /> </button>
                            </div>
                        }
                    ]}
                    data={users}
                    highlightOnHover
                    pagination
                    paginationServer
                    paginationTotalRows={total}
                    paginationPerPage={pageSize}
                    paginationComponentOptions={{
                        noRowsPerPage: true
                    }}
                    onChangePage={page => {
                        listUsers(page);
                    }}
                />
            </div>
        </div>
    );

}