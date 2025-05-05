// utils/emailTemplates.js

function getHiringEmail(candidateName) {
    return {
      subject: 'Congratulations! You’re Hired 🎉',
      html:
        '<h2>Dear ' + candidateName + ',</h2>' +
        '<p>We are thrilled to offer you a position at our company.</p>' +
        '<p>Welcome aboard! 🎉</p>' +
        '<p>We’ll be in touch with the next steps shortly.</p>' +
        '<br/>' +
        '<p>Best regards,<br/>The Hiring Team</p>',
    };
  }
  
  function getRejectionEmail(candidateName) {
    return {
      subject: 'Thank You for Interviewing With Us',
      html:
        '<h2>Dear ' + candidateName + ',</h2>' +
        '<p>We appreciate the time and effort you put into the interview process.</p>' +
        '<p>Unfortunately, we have decided not to proceed with your application at this time.</p>' +
        '<p>We wish you the best in your career ahead.</p>' +
        '<br/>' +
        '<p>Sincerely,<br/>The Hiring Team</p>',
    };
  }
  
  module.exports = {
    getHiringEmail: getHiringEmail,
    getRejectionEmail: getRejectionEmail,
  };
  