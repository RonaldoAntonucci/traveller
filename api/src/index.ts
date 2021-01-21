import App from './shared/infra/http/app';

const app = new App();

const port = 3333;

app.init({ port }).then(() => console.log(`Online on port ${port}`));
