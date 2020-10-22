import React, { useState, useEffect } from 'react';
import UserService from '../services/user.service';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import { Pencil, Trash, PersonPlus } from 'react-bootstrap-icons';

export default function UserList(props) {

    const [users, setUsers] = useState([]);
    const history = useHistory();
    const service = new UserService();

    const listUsers = async () => {
        const response = await service.getAll();
        setUsers(response.data);
    }

    const removeUser = async (id) => {
        await service.delete(id);
        await listUsers();
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
                    <button type="button" className="btn btn-outline-primary" onClick={() => history.push(`users/add`)}><PersonPlus /> Adicionar </button>
                </div>
            </div>
            <div className="row" style={{paddingTop: '24px'}}>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Nome</th>
                            <th scope="col">E-mail</th>
                            <th scope="col">Data de nascimento</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users && users.map((user, index) => (
                            <tr key={index}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{moment(user.birthDate, 'YYYY-MM-DD').format('DD/MM/YYYY')}</td>
                                <td>
                                    <button style={{ marginRight: '8px' }} type="button" className="btn btn-outline-warning" onClick={() => history.push(`users/edit/${user.id}`)}><Pencil /> </button>
                                    <button type="button" className="btn btn-outline-danger" onClick={() => removeUser(user.id)}><Trash /> </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

}