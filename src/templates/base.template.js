describe('{$ doc.name $}', function() {
    var result,
        target;

{% if doc.dependencies.spies -%}
    {$ doc.dependencies.variableDefinitions $}
{%- endif %}

    beforeEach(module('{$ doc.module $}'));
{% block content %}{% endblock -%}

{% include 'blocks/methods.template.js' -%}

});
