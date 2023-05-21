import Analyze from "./analyze.vue"


let vm;


const render = target => {
    vm = new Vue({...Analyze}).$mount(target);
};


const process = (data) => {
    vm.setData(data);
};


const destroy = () => {
    vm.$destroy();
    while(vm.$el.firstChild) vm.$el.removeChild(vm.$el.firstChild);
    vm = undefined;
};


const copy = () => {
    let a = document.createElement("textarea");
    a.setAttribute("style","width: 1px; border: 0; opacity: 0;");
    document.body.appendChild(a);

    a.value = vm.$el.innerText;
    a.select();
    document.execCommand("copy");
    document.body.removeChild(a);
};


export default {
    render,
    process,
    destroy,
    copy,
}
