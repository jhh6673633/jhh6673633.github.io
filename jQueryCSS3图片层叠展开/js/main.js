$('ul.cards').click(function (e) { 
    e.preventDefault();
    $(this).toggleClass('transition');
});

$('ul.card-stacks').click(function (e) { 
    e.preventDefault();
    $(this).toggleClass('active')
});

$('ul.cards-split').click(function (e) { 
    e.preventDefault();
    $(this).toggleClass('trigger')
});
$('ul.cards-split-delay').click(function (e) { 
    e.preventDefault();
    $(this).toggleClass('delay')
});