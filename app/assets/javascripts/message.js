$(function(){ 
    function buildHTML(message){
      if ( message.image ) {
        var html =
          `<div class="main-ber__chat-spaces-space" data-message-id=${message.id}>
            <div class="main-ber__chat-spaces-space">
              <p class="main-ber__chat-spaces-space-user">
                ${message.user_name}
              </p>
              <p class="main-ber__chat-spaces-space-time">
                ${message.created_at}
              </p>
            </div>
          </div>
          <div class="main-ber__chat-spaces-lower">
            <p class="main-ber__chat-spaces-space-text">
              ${message.content}
            </p>
            <img class="lower-message__image" src=${message.image}>
          </div>`
        return html;
      } else {
        var html =
          `<div class="main-ber__chat-spaces-space" data-message-id=${message.id}>
            <div class="main-ber__chat-spaces-space">
              <p class="main-ber__chat-spaces-space-user">
                ${message.user_name}
              </p>
              <p class="main-ber__chat-spaces-space-time">
                ${message.created_at}
              </p>
            </div>
          <
          <div class="main-ber__chat-spaces-lower">
            <p class="main-ber__chat-spaces-space-text">
              ${message.content}
            </p>
          </div>`
        return html;
      };
    }
  $('#new_message').on('submit', function(e){
      e.preventDefault();
      var formData = new FormData(this);
      var url = $(this).attr('action');
      $.ajax({
        url: url,
        type: "POST",
        data: formData,
        dataType: 'json',
        processData: false,
        contentType: false
      })
        .done(function(data){
          var html = buildHTML(data);
          $('.main-ber__chat-spaces').append(html);
          $('form')[0].reset();
          $('.form-btn').prop( 'disabled', false )
          $('.main-ber__chat-spaces').animate({ scrollTop: $('.main-ber__chat-spaces')[0].scrollHeight});
        })
        .fail(function(data) {
          alert("メッセージ送信に失敗しました");
      });
  })

  var reloadMessages = function() {
    var last_message_id = $('.message:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.main-ber__chat-spaces-space').append(insertHTML);
        $('.main-ber__chat-spaces-space').animate({ scrollTop: $('.messages')[0].scrollHeight});
      } 
    })
    .fail(function() {
      alert('error');
    });
  };
  setInterval(reloadMessages, 7000);
});