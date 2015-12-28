{% extends "base.template.js" %}

{% block content %}
    beforeEach(inject(function($controller) {
    {%- for spy in doc.dependencies.spies %}
        {$ spy.variable $} = jasmine.createSpyObj('{$ spy.dependency $}', ['']);
    {% endfor %}
        target = $controller('{$ doc.name $}', {
        {%- for spy in doc.dependencies.spies %}
            {$ spy.dependency $}: {$ spy.variable $},
        {%- endfor %}
        });
    }));
{% endblock %}
