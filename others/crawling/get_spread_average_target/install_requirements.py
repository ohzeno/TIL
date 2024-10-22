import subprocess

def check_and_install_dependencies():
    dependencies = {
        'requests': 'requests',
        'bs4': 'bs4',
        'pandas': 'pandas',
        'tqdm': 'tqdm',
        'dotenv': 'python-dotenv'
    }

    for import_name, package_name in dependencies.items():
        try:
            __import__(import_name)
            print(f"{package_name} is already installed.")
        except ImportError:
            print(f"{package_name} not installed. Installing now...")
            subprocess.run(["pip", "install", package_name])

check_and_install_dependencies()
