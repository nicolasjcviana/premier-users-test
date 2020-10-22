import React, { useEffect, useState } from 'react';
import InputMask from 'react-input-mask';
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";
import UserService from "../services/user.service";
import moment from 'moment';
import DateUtils from '../utils/date.utils';

const validateBirthDate = (birthDate) => {
    return moment(birthDate, 'DD/MM/YYYY').isValid();
}

export default function User() {

    const { register, handleSubmit, errors, setValue } = useForm({
        criteriaMode: 'all',
        reValidateMode: 'onChange'
    });
    const { id } = useParams();

    const history = useHistory();
    const service = new UserService();

    const loadUserData = async (id) => {
        const response = await service.get(id);
        const userData = response.data;
        userData.birthDate = DateUtils.toDefaultDate(userData.birthDate);
        Object.keys(userData).forEach(key => setValue(key, userData[key]));
    };

    useEffect(() => {
        if (id) {
            loadUserData(id);
        }
    }, []);

    const onSalvar = (data) => {
        data.birthDate = DateUtils.toServerDate(data.birthDate);
        const saveMethod = id ? service.update(id, data) : service.create(data);

        saveMethod
            .then(() => {
                history.push("/users");
            })
            .catch(error => {
                console.error(error);
            })
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSalvar)}>
                <div className="form-group">
                    <label htmlFor="name">Nome</label>
                    <input
                        type="text"
                        className="form-control"
                        name="name"
                        ref={register({ required: true })}
                    />
                    <div className="error-message">{errors.name && 'Nome é obrigatório'}</div>
                </div>

                <div className="form-group">
                    <label htmlFor="email">E-mail</label>
                    <input
                        className="form-control"
                        name="email"
                        ref={register({
                            required: true, pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "E-mail inválido"
                            },

                        })}
                    />
                    <div className="error-message">{errors.email?.types['required'] ? 'E-mail é obrigatório' : ''}</div>
                    <div className="error-message">{errors.email?.types['pattern'] ? 'E-mail é de formato inválido' : ''}</div>
                </div>
                <div className="form-group">
                    <label htmlFor="birthDate">Data de nascimento</label>

                    <InputMask
                        name="birthDate"
                        className="form-control"
                        mask="99/99/9999"
                        inputRef={register({
                            required: true,
                            validate: { invalidDate: validateBirthDate }
                        })} />
                    <div className="error-message">{errors.birthDate && errors.birthDate.type === 'required' ? 'Data é obrigatória' : ''}</div>
                    <div className="error-message">{errors.birthDate && errors.birthDate.type === 'invalidDate' ? 'Data inválida' : ''}</div>
                </div>
                <button type="submit" className="btn btn-success">
                    Salvar
                </button>
            </form>
        </div>
    )
}