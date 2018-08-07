let date = new Date();
document.getElementById('date').innerHTML = `${date.getDate()}/${(date.getMonth() + 1)}/${date.getFullYear()}`;

document.getElementById('register').addEventListener('click', () => {
  document.getElementById('infoModal').style.display = 'inherit';
});

document.getElementById('closeButton').addEventListener('click', () => {
  document.getElementById('infoModal').style.display = 'none';
});
document.addEventListener('DOMContentLoaded', window.showDashboardAdmin(document.getElementById('containerVisits')));
document.getElementById('saveVisit').addEventListener('click', ()=>{
  const infoVisit = {
    identificador: document.getElementById('identification').value,
    visitedCompany: document.getElementById('comunalOffices').value,
    visited: document.getElementById('employees').value,
  };
  window.addVisit(infoVisit, window.newDate);
});

window.sendEmail = () => {
  $.ajax({
    type: "POST",
    url: "https://mandrillapp.com/api/1.0/messages/send.json",
    data: {
      'key': 'ZGiSDAUGJIgaCMIqm9ysPA',
      'message': {
        'from_email': 'yulissa@laboratoria.la',
        'to': [
          {
            'email': 'yulissa.lteran@gmail.com',
            'name': 'YOUR_RECEIVER_NAME',
            'type': 'to'
          }
        ],
        'subject': 'title',
        'html': 'html can be used'
      }
    }
  }).then((response) => {
    console.log(response);
  }).catch((error) => {
    console.log(error);
  });
};
window.onload = window.sendEmail();
// {
//   "key": "ZGiSDAUGJIgaCMIqm9ysPA",
//   "message": {
//       "html": "<p>Example HTML content</p>",
//       "text": "Example text content",
//       "subject": "example subject",
//       "from_email": "gonzalo.p@laboratoria.la",
//       "from_name": "Example Name",
//       "to": [
//           {
//               "email": "gonzaloparra@gmail.com",
//               "name": "Recipient Name",
//               "type": "to"
//           }
//       ],
//       "headers": {
//           "Reply-To": "gonzalo.p@laboratoria.la"
//       }
      
//   },
//   "async": false,
//   "ip_pool": "Main Pool",
//   "send_at": "2018-08-06 10:00:00"
// }

// function sendMail(){
//   $.ajax({
//     type: "POST",
//     url: "https://mandrillapp.com/api/1.0/messages/send.json",
//     data: {
//       'key': 'YOUR_KEY',
//       'message': {
//         'from_email': 'YOUR_SENDER@example.com',
//         'to': [
//           {
//             'email': 'YOUR_RECEIVER@example.com',
//             'name': 'YOUR_RECEIVER_NAME',
//             'type': 'to'
//           }
//         ],
//         'subject': 'title',
//         'html': 'html can be used'
//       }
//     }
//   });
// }