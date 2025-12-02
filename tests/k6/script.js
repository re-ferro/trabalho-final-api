import http from 'k6/http';
import { sleep, check, group } from 'k6';

const BASE_URL = __ENV.BASE_URL || 'http://localhost:3001';

export const options = {
  vus: 10,
  duration: '30s',
  thresholds: {
    http_req_duration: ['p(90)<=2', 'p(95)<=3'],
    http_req_failed: ['rate<0.01']
  }
};

export default function() {
    let responseUsersLogin = '';

    group('Fazendo Login', () => {
    responseUsersLogin = http.post(
    `${BASE_URL}/users/login`, 
    JSON.stringify({
        email: 'renata@teste.com', 
        password: 'renata'
    }),
    { 
        headers: { 
            'Content-Type': 'application/json' 
        } 
    });
})
    group('Registrando o Checkout', () => {
    let responseCheckout = http.post(
        `${BASE_URL}/checkout`,
        JSON.stringify({
            
  "items": [
    {
      "productId": 1,
      "quantity": 10
    }
  ],
  "freight": 10,
  "paymentMethod": "boleto",
  "cardData": {
    "number": "344354354354354",
    "name": "Fulano de Tal",
    "expiry": "06/30",
    "cvv": "234"
  
}
        }),
        { 
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${responseUsersLogin.json('token')}` 
            }
    });
    check(responseCheckout, {
        'status deve ser igual a 200': (res) => res.status === 200,
    }); 
})

    group('Simulando o pensamento do usuário', () => {
    sleep(1);
    })
}
