document.addEventListener('DOMContentLoaded', function () {
    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);

    var selects = document.querySelectorAll('select');
    M.FormSelect.init(selects);
});