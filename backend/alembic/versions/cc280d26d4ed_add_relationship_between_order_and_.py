"""Add relationship between order and product, add/remove some column

Revision ID: cc280d26d4ed
Revises: 17063b9113d2
Create Date: 2023-06-20 11:32:07.013644

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'cc280d26d4ed'
down_revision = '17063b9113d2'
branch_labels = None
depends_on = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('orders', sa.Column('total_price', sa.Integer(), nullable=True))
    op.add_column('products', sa.Column('order_id', sa.Integer(), nullable=True))
    op.create_foreign_key(None, 'products', 'orders', ['order_id'], ['id'])
    op.drop_column('products', 'quantity')
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('products', sa.Column('quantity', sa.INTEGER(), autoincrement=False, nullable=True))
    op.drop_constraint(None, 'products', type_='foreignkey')
    op.drop_column('products', 'order_id')
    op.drop_column('orders', 'total_price')
    # ### end Alembic commands ###
