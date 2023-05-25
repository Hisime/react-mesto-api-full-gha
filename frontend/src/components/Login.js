import {useState} from "react";

function Login({handleLogin}) {
    const [formValue, setFormValue] = useState({
        email: '',
        password: ''
    })
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormValue({
            ...formValue,
            [name]: value
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formValue.email || !formValue.password) {
            return;
        }
        handleLogin(formValue.email, formValue.password)
    }
    return (
        <form className="authentication" onSubmit={handleSubmit}>
            <h1 className="authentication__title">Вход</h1>
            <input
                className="authentication__input"
                type="email"
                placeholder="Email"
                onChange={handleChange}
                id="email"
                name="email"
            />
            <input
                className="authentication__input"
                type="password"
                placeholder="Пароль"
                onChange={handleChange}
                id="password"
                name="password"
            />
            <button className="authentication__button" type="submit">Войти</button>
        </form>
    )
}

export default Login;