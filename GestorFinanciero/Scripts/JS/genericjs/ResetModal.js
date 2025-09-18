document.addEventListener('DOMContentLoaded', function () {
    var modals = document.querySelectorAll('.modal');

    M.Modal.init(modals, {
        onCloseEnd: function () {
            const forms = this.el.querySelectorAll('form');
            forms.forEach(form => form.reset());

            const selects = this.el.querySelectorAll('select');
            M.FormSelect.init(selects);

            const alerts = this.el.querySelectorAll('#alertContainer');
            alerts.forEach(alert => alert.innerHTML = '');

            const inputs = this.el.querySelectorAll('input');
            inputs.forEach(input => input.value = '');

            M.updateTextFields();
        }
    });
});
