import {createStore} from "vuex";
import axiosClient from "../axios";

const tmpSurveys = [
    {
        id: 100,
        title: "Cafe Small House with laravel",
        slug: "cafe-small-house-with-laravel",
        status: "draft",
        image: "https://i.imgur.com/dtuN6qr.png",
        description: "test",
        created_at: "2022-05-19 18:00:00",
        updated_at: "2022-05-19 18:00:00",
        expire_date: "2022-05-31 18:00:00",
        questions: [
            {
                id: 1,
                type: "select",
                question: "From which country are you?",
                description: null,
                data: {
                    options:{uuid:"faf96f2-1d80-4632-9e9e-b560670e52ea" , text:"USA"}
                }
            } ,
            {
                id: 2,
                type: "checked",
                question: "Which language videos do you want to see on my channel?",
                description: "test",
                data: {
                    options:{uuid:"faf96f2-1d80-4632-9e9e-b560670e52ea" , text:"Javascript"}
                }
            }
        ]
    }
];


const store = createStore({
    state: {
        user: {
            data: {},
            token: sessionStorage.getItem('TOKEN'),
        },
        surveys: [...tmpSurveys],
    },
    getters: {},
    actions: {
        register({commit}, user) {
            return axiosClient.post('/register', user)
                .then(({data}) => {
                    commit('setUser', data);
                    return data;
                })
        },

        login({commit}, user) {
            return axiosClient.post('/login', user)
                .then(({data}) => {
                    commit('setUser', data);
                    return data;
                })
        },
        logout({commit}) {
            return axiosClient.post('/logout')
                .then(response => {
                    commit('logout')
                    return response;
                })
        }
    },
    mutations: {
        logout: (state) => {
            state.user.token = null;
            state.user.data = {};
            sessionStorage.removeItem("TOKEN");
        },
        setUser: (state, userData) => {
            state.user.token = userData.token;
            state.user.data = userData.user;
            sessionStorage.setItem('TOKEN', userData.token);
        }
    },
    modules: {},
});

export default store;
