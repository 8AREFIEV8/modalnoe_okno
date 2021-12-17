let fruits = [
    {id: 1, title: 'Apple', price: 20, img: 'https://grocery11.com/wp-content/uploads/2021/04/apple-fruit-500x500-1.jpg" class="card-img-top'},
    {id: 2, title: 'Orange', price: 30, img: 'https://www.luluhypermarket.com/medias/1291292-01.jpg-1200Wx1200H?context=bWFzdGVyfGltYWdlc3wxMjM5OTh8aW1hZ2UvanBlZ3xpbWFnZXMvaDU0L2g4MS85MTQ4Mjc4MTEyMjg2LmpwZ3w0ODI2ZjY1NzU5NGU3ZGJiYTExMTM4NzNkODZlYjRjYTBmNzNkMTdkYmQ0ZjFiMTk0YjNlMDk3YjRkZTUxNjVh'},
    {id: 3, title: 'Mango', price: 50, img: 'https://nebanan.com.ua/wp-content/uploads/2019/11/dizajn-bez-nazvaniya-29-e1602670749739.jpg'}
]

const toHTML = fruit => `
 <div class="col">
       <div class="card">
          <img style="height: 300px" src="${fruit.img}" alt="${fruit.title}">
          <div class="card-body">
              <h5 class="card-title">${fruit.title}</h5>
              <a href="#" class="btn btn-primary" data-btn="price" data-id="${fruit.id}">See the ptice</a>
              <a href="#" class="btn btn-danger" data-btn="remove" data-id="${fruit.id}">Delete</a>
          </div>
       </div>
 </div>
`

function render() {
  const html = fruits.map(toHTML).join('')
  document.querySelector('#fruits').innerHTML = html
}

render()

const priceModal = $.modal( {
    title: 'Price',
    closable: true,
    width: '400px',
    footerButtons: [
        {text: 'Close', type: 'primary', handler() {
            priceModal.close()
            }}
    ]
})

document.addEventListener('click', event => {
    event.preventDefault()
    const btnType = event.target.dataset.btn
    const id = +event.target.dataset.id
    const fruit = fruits.find(f => f.id === id)

    if (btnType === 'price') {
        priceModal.setContent(`
        <p>Price: ${fruit.title}: <strong>${fruit.price}$</strong></p>
        `)
       priceModal.open()
    } else if (btnType === 'remove') {
        $.confirm( {
            title: 'Are you sure?',
            content:` <p>You are removing the fruit : <strong>${fruit.title}</strong></p>`
        }).then(() => {
            fruits = fruits.filter(f => f.id !== id)
            render()

        }).catch( () => {
            console.log('Cancel')
        })

    }
})
















