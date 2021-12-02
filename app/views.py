from django.shortcuts import redirect


def handle_not_found(request, exception=None):
    return redirect('/')
