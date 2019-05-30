'use strict';

const buildAPI = methods => {
  const api = {};
  for (const method of methods) {
    api[method] = (...args) => new Promise((resolve, reject) => {
      const url = `/api/${method}`;
      console.log(url, args);
      fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(args),
      }).then(res => {
        const { status } = res;
        if (status !== 200) {
          reject(new Error(`Status Code: ${status}`));
          return;
        }
        resolve(res.json());
      });
    });
  }
  return api;
};

const api = buildAPI(['entity', 'read', 'update']);

const createForm = async (entity, id) => {
  const schema = await api.entity(entity);
  const instance = await api.read(id);
  const form = document.createElement('div');
  const inputs = {};
  for (const field in schema) {
    const definition = schema[field];
    const input = document.createElement('input');
    input.setAttribute('id', field);
    if (definition.control === 'password') {
      input.setAttribute('type', 'password');
    }
    input.value = instance[field];
    inputs[field] = input;
    const label = document.createElement('label');
    label.innerHTML = field;
    label.setAttribute('for', field);
    const br = document.createElement('br');
    form.appendChild(label);
    form.appendChild(input);
    form.appendChild(br);
  }
  const button = document.createElement('button');
  button.innerHTML = 'Save';
  button.onclick = () => {
    const instance = {};
    for (const field in schema) {
      instance[field] = inputs[field].value;
    }
    api.update(id, instance);
  };
  form.appendChild(button);
  document.body.appendChild(form);
};

createForm('sensor', 2000);
