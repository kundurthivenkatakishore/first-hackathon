document.querySelector(".compose").addEventListener("click", () => {
    if(document.querySelector(".compose-view").style.display === "none"){
    compose_email()
  }
});
// history.pushState({compose : }, "", `./#${link.id}`)
// By default, load the inbox
load_mailbox("inbox");

function compose_email(email = null, status="") {
tog_menu(); // toggle sidebar when on mobile devices
if($(window).width() <= 768){
  document.querySelector('.navbar').style.display = "flex";
}
if (document.querySelector(".compose-view").style.display === "none") {
  // create new instance of balloonEditor
  BalloonEditor.create(document.querySelector(".compose-body"))
    .then((editor) => {
      // console.log( editor );
      editor.setData("");
      if (email !== null && status === "reply") {
        editor.setData(
          `<p> On ${email.timestamp} ${email.sender} wrote: </p> ${email.body}`
        );
      }
      else if (email !== null && status === "forward") {
        editor.setData(
          `<p>---------- Forwarded message ---------</p>
          <p>From: <strong>${email.username}</strong> <span class="detail-small d-none d-lg-inline"><span><</span>${email.sender}></span> </p>
          <p>Date: ${email.timestamp}</p>
          <p>Subject: ${email.subject}</p> 
          <p>To: ${email.recipients}</p> 
          ${email.body}`
        );
      }
      document.querySelector(".compose").addEventListener("click", () => {
        editor.setData("");
      });
      // destroy editor instance if the compose view is not visible
      let targetNode = document.querySelector(".compose-view");
      let observer = new MutationObserver(function () {
        if (targetNode.style.display == "none") {
          editor.destroy();
        }
      });
      observer.observe(targetNode, { attributes: true });
    })
    .catch((error) => {
      console.error(error);
    });
}}