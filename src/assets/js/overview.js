//var reservationData;
//var boxesData;
var maxDates = 10;

var reservationData = [{"ID": "1", "name": "laura", "boxID": "1"},{"ID": "2", "name": "finchen", "boxID": "2"}];

$(function () {
    init();
});

const init = async () => {
    await fillCardsWithReservations();
    await fillCardsWithEmptySlots();
    setDragzoneHandlers();
    setDropzoneHandlers();
}

const fillCardsWithReservations = () => {
    var dropzones = $('.dropzone');

    dropzones.empty();

    for(var i=0; i<reservationData.length; i++){
        var reservation = reservationData[i];
        var catSlot = '<li class="list-group-item">' + reservationSlot(reservation) + '</li>';
        $('#boxlist' + reservation.boxID).append(catSlot);
    }
}

const fillCardsWithEmptySlots = () => {
    var emptyslot = '<li class="list-group-item"><div class="emptyslot">-</div></li>';
    for(var i=1; i<=$('.dropzone').length; i++){
        for(var j=0; j< $('#boxlist' + i).data('size'); j++){
            $('#boxlist' + i).append(emptyslot)
        }
    }
}

const setDragzoneHandlers = () => {
    $(".dragzone").on("dragstart", function(ev) {
        ev.originalEvent.dataTransfer.setData("text", ev.originalEvent.target.id);
        $('.emptyslot').parent().addClass("border-success");
    });
}

const setDropzoneHandlers = () => {
    $(".dropzone")
        .on("dragenter", onDragEnter)
        //.on("dragover", onDragOver)
        .on("dragleave", onDragLeave)
        .on("drop", onDrop);
}

const onDrop = function(ev) {
    ev.preventDefault();
    $(this).removeClass("border-success");

    //ev.originalEvent.target.appendChild(document.getElementById(data));

    var dragID = ev.originalEvent.dataTransfer.getData("text");

    if(!$('#' + dragID).hasClass('dragzone')){
        console.log("no valid drag");
        return;
    }

    var targetDropUL = $(ev.originalEvent.target).closest('ul');
    $('#' + dragID).parent().append('<div class="emptyslot">-</div>');
    $('#' + dragID).parent().appendTo($('#' + dragID).parent().parent());
    $('#' + dragID).appendTo(targetDropUL.find('li').has('.emptyslot').first());
    targetDropUL.find('div.emptyslot').first().remove();

    return;

    if($(ev.originalEvent.target).hasClass('dropzone')){
        console.log("JOO");
        $('#' + dragID).appendTo($('#' + dropID));
    }else {
        //$('#' + dragID).appendTo($('.dropzone li').has('.emptyslot').first());
        $('#' + dragID).parent().append('<div class="emptyslot">leer</div>');
        $('#' + dragID).parent().appendTo($('#' + dragID).parent().parent());
        $('#' + dragID).appendTo($('#' + dropID).parent().parent().find('li').has('.emptyslot').first());
        $('#' + dropID).parent().parent().find('div.emptyslot').first().remove();
        //$('.dropzone li .e').has('.emptyslot').first().remove();
        //$('#' + dragID).appendTo($('.dropzone').has('#' + dropID));
    }


};

const onDragOver = function(ev) {
    ev.preventDefault(); 
    if(!$(this).hasClass("border-success")) 
        $(this).addClass("border-success");
};

const onDragEnter = function(ev) {
    ev.preventDefault();
    
};

const onDragLeave = function(ev) {
    ev.preventDefault();
    $(ev.originalEvent.target).closest('ul').find('.emptyslot').parent().removeClass("border-success");
};
const reservationSlot = (reservation) => {
    return '<div id="' + reservation.ID + '" class="dragzone" draggable="true">' + reservation.name + '</div>';
}