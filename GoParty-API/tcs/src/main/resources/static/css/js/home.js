
    $(document).ready(function() {
        $('.like').change(function() {
            if (this.checked) {
                var eventoId = $(this).data('evento-id');
                curtirEvento(eventoId);
            }
        });

    function curtirEvento(eventoId) {
            $.ajax({
                type: 'POST',
                url: '/curtirEvento/' + eventoId,
                success: function(response) {
                    if (response.success) {
                    }
                }
            });
        }
    });
