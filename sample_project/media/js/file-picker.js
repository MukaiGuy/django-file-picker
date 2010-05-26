$(document).ready(function() {
    var anchor = $('<a>').attr({
        'id': 'file-picker',
        'name': 'file-picker',
        'href': '#'
    }).text('Add Image');
    anchor.click(function(e) {
        e.preventDefault();
        var picker = $(this).data('picker');
        picker.show();
    })
    var dialog = $('<div>').attr('id', 'picker-dialog');
    $('.form-row.body').prepend(anchor).prepend(dialog);
    $('#file-picker').data('picker', new FilePicker('/blog/images/'));
});

function FilePicker(url) {
    this.url = url;
    this.files = [];
    this.window = $('#picker-dialog');
    this.window.dialog({
        title: 'File Picker',
        width: 600,
        height: 400,
        autoOpen: false
    });
    this.show = function () {
        this.getFiles();
        this.window.dialog('open');
    }
    this.getFiles = function() {
        var picker = this;
        $.get(this.url, function(data) {
            picker.displayFiles(data.result);
        });
    }
    this.displayFiles = function(files) {
        var picker = this;
        this.window.empty();
        var table = $('<table>');
        $.each(files, function(idx, file) {
            var tr = $('<tr>');
            
            var a = $('<a>').click(
                function(e){
                    insertAtCaret('id_body', file.insert);
                }
            );
            var img = $('<img>').attr({
                'alt': file.name,
                'src': file.thumb.url,
                'width': file.thumb.width,
                'height': file.thumb.height
            });
            a.append(img);
            
            tr.append($('<td>').append(a));
            tr.append($('<td>').text(file.name));
            table.append(tr);
        });
        this.window.append(table);
    }
}

function insertAtCaret(areaId,text) { 
    var txtarea = document.getElementById(areaId);
    var scrollPos = txtarea.scrollTop;
    var strPos = 0;
    var br = ((txtarea.selectionStart || txtarea.selectionStart == '0') ? "ff" : (document.selection ? "ie" : false ) );
    if (br == "ie") { txtarea.focus();
        var range = document.selection.createRange();
        range.moveStart ('character', -txtarea.value.length);
        strPos = range.text.length;
    } else if (br == "ff") strPos = txtarea.selectionStart;
    var front = (txtarea.value).substring(0,strPos);
    var back = (txtarea.value).substring(strPos,txtarea.value.length);
    txtarea.value=front+text+back;
    strPos = strPos + text.length;
    if (br == "ie") { 
        txtarea.focus();
        var range = document.selection.createRange();
        range.moveStart ('character', -txtarea.value.length);
        range.moveStart ('character', strPos);
        range.moveEnd ('character', 0);
        range.select();
    } else if (br == "ff") { 
        txtarea.selectionStart = strPos;
        txtarea.selectionEnd = strPos;
        txtarea.focus();
    }
    txtarea.scrollTop = scrollPos;
} 
