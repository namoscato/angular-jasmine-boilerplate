{%- for method in doc.methods %}
    /**
     * {$ method.name $}
     */
    
    describe('When {$ method.description $}', function() {
        beforeEach(function() {
            target.{$ method.name $}();
        });

        it('should ', function() {

        });
    });
{% endfor -%}
