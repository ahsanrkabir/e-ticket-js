const ticketPrice = 550;
let availableTicketCount = 40;
let selectedTicketCount = 0;
let maxSelectedTicketCount = 4;

// adding event listener for each seat
const seatCollection = document.getElementsByClassName('seat');
for (const seat of seatCollection) {
    seat.addEventListener('click', function seatEvent(e) {
        selectedTicketCount = selectedTicketCount + 1;
        availableTicketCount = availableTicketCount - 1;
        // check if selected seat <= 4
        if (selectedTicketCount <= maxSelectedTicketCount) {
            // change background color
            e.target.style.backgroundColor = '#1DD100';
            e.target.style.color = 'white';

            // update available ticket
            setInnerText('available-seat', availableTicketCount);

            // update selected ticket count
            setInnerText('ticket-count', selectedTicketCount);

            // update table
            const seatId = e.target.innerText;
            const displayTable = document.getElementById('display-table');
            const row = document.createElement("tr");
            const td1 = document.createElement("td");
            td1.innerText = seatId;
            row.appendChild(td1);
            const td2 = document.createElement("td");
            td2.innerText = 'Economy';
            row.appendChild(td2);
            const td3 = document.createElement("td");
            td3.innerText = ticketPrice + ' BDT';
            row.appendChild(td3);
            displayTable.appendChild(row);

            // update total price
            const initialTotalPrice = parseInt(document.getElementById('total-price').innerText);
            const totalPrice = initialTotalPrice + ticketPrice;
            setInnerText('total-price', totalPrice);

            // update grand total
            const grandTotal = initialTotalPrice + ticketPrice;
            setInnerText('grand-total', grandTotal);

            // coupon btn enabler
            if (grandTotal === 2200) {
                const couponBtn = document.getElementById('coupon-btn');
                couponBtn.classList.remove('btn-disabled');
            }

            // success btn enabler
            if (grandTotal >= 550) {
                const successBtn = document.getElementById('success-btn');
                successBtn.classList.remove('btn-disabled');
            }

            // remove event listener
            e.target.removeEventListener('click', seatEvent);
        }
        // when selected seat > 4
        else {
            alert('You cannot purchase more than 4 Tickets!');
        }
    })
}

// apply coupon
function applyCoupon() {
    // input
    const couponInput = document.getElementById('coupon-input').value;

    // coupons
    const coupon1 = document.getElementById('coupon-1').innerText;
    const coupon2 = document.getElementById('coupon-2').innerText;

    // checking coupons
    if (couponInput === coupon1) {
        const grandTotal1 = 2200 * 0.85;
        setInnerText('grand-total', grandTotal1);
        document.getElementById('coupon-div').style.display = 'none';
    }
    else if (couponInput === coupon2) {
        const grandTotal2 = 2200 * 0.80;
        setInnerText('grand-total', grandTotal2);
        document.getElementById('coupon-div').style.display = 'none';
    }
    else {
        alert('Invalid Coupon!');
        document.getElementById('coupon-input').value = '';
    }
}


// calculate total price
function calculateTotalPrice(id, value) {
    const initialTotalPrice = parseInt(document.getElementById(id).innerText);
    const totalPrice = initialTotalPrice + value;
    setInnerText(id, totalPrice);
}


// set inner text function
function setInnerText(id, value) {
    document.getElementById(id).innerText = value;
}