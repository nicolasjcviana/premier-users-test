import http from '../http-common';

class UserService {
    getAll(pageIndex, pageSize) {
        return http.get("/users", {
            params: {
                pageIndex,
                pageSize
            }
        });
    }

    get(id) {
        return http.get(`/users/${id}`);
    }

    create(data) {
        return http.post("/users", data);
    }

    update(id, data) {
        return http.put(`/users/${id}`, data);
    }

    delete(id) {
        return http.delete(`/users/${id}`);
    }
}

export default UserService;