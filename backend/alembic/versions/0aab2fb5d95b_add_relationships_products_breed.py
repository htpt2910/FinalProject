"""Add relationships products-breed

Revision ID: 0aab2fb5d95b
Revises: 90e9d5091c63
Create Date: 2023-06-19 12:34:10.098154

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '0aab2fb5d95b'
down_revision = '90e9d5091c63'
branch_labels = None
depends_on = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('products', sa.Column('breed_id', sa.Integer(), nullable=True))
    op.drop_index('ix_products_breed', table_name='products')
    op.create_foreign_key(None, 'products', 'breeds', ['breed_id'], ['id'])
    op.drop_column('products', 'breed')
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('products', sa.Column('breed', sa.VARCHAR(), autoincrement=False, nullable=True))
    op.drop_constraint(None, 'products', type_='foreignkey')
    op.create_index('ix_products_breed', 'products', ['breed'], unique=False)
    op.drop_column('products', 'breed_id')
    # ### end Alembic commands ###
